package com.dita.metapilot.user.controller;

import com.dita.metapilot.exception.CustomValidationException;
import com.dita.metapilot.log.dto.SwaggerRespDto;
import com.dita.metapilot.security.PrincipalDetails;
import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * <p>로그인 페이지 및 회원가입 요청 http 통신 추가</p>
 *
 * @author 권명승 (@myeongseung)
 * @since 2023. 11. 27.
 * @version 1.0.0
 * */
@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    /**
     * <p>로그인 페이지를 반환하는 컨트롤러 메서드</p>
     * @return 로그인 페이지의 경로를 문자열로 반환
     * @since 2023. 11. 27.
     */
    @GetMapping("/login")
    public String loginPage() {
        return "user/login";
    }

    /**
     * <p>회원가입 페이지를 반환하는 컨트롤러 메서드</p>
     * @return 회원가입 페이지의 경로를 문자열로 반환
     * @since 2023. 11. 28.
     */
    @GetMapping("/register")
    public String registerPage() {
        return "user/register";
    }

    /**
     * <p>로그인 성공 테스트 페이지</p>
     * @return 로그인 성공 페이지의 경로를 문자열로 반환
     * @since 2023. 11. 28.
     */
    @GetMapping("/login/success")
    public String loginSuccess() {
        return "user/loginSuccess.html";
    }

    /**
     * <p>회원가입 요청을 처리하는 컨트롤러 메서드</p>
     *
     * @param registerDto 회원가입 요청 시 필요한 사용자 정보를 담은 DTO
     * @param bindingResult 요청 데이터의 검증 결과를 담은 객체
     * @since 2023. 11. 28.
     * @return ResponseEntity 객체를 반환하며, 회원가입이 성공적으로 처리되었을 경우 서비스 계층에서 반환된 결과를 포함
     */
    @ResponseBody
    @PostMapping("/api/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto, BindingResult bindingResult) {
        return ResponseEntity.ok(userService.registerUser(registerDto));
    }

    @GetMapping("/api/checkUserId")
    public ResponseEntity<?> checkUserId(@RequestParam String userId) {
        try {
            userService.duplicateUserId(userId);
            return ResponseEntity
                    .ok()
                    .body("사용 가능한 아이디입니다.");
        } catch (CustomValidationException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getErrorMap()); //이미 중복인 경우 배드 리퀘스트 발생
        }
    }

    /**
     * <p>유저 정보를 처리하는 컨트롤러 메서드</p>
     *
     * @param userId 사용자 Id
     * @since 2023. 11. 29.
     * @return 사용자의 아이디 유무를 판단하여 결과값 반환
     */
    @ResponseBody
    @GetMapping("/{userId}")
    public ResponseEntity<? extends SwaggerRespDto<? extends UserEntity>> getUser(@PathVariable String userId) {
        UserEntity user = userService.getUser(userId);
        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new SwaggerRespDto<>(HttpStatus.NOT_FOUND.value(), "User not found", null));
        }
        return ResponseEntity
                .ok()
                .body(new SwaggerRespDto<>(HttpStatus.OK.value(), "Success", user));
    }

    //모두 접근 가능
    @ResponseBody
    @GetMapping("user")
    public String user(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("principal : "+principal.getUser().getId());
        System.out.println("principal : "+principal.getUser().getPassword());

        return "<h1>user</h1>";
    }
    //유저는 접근 안됨
    @ResponseBody
    @GetMapping("/moderator")
    public String moderator(){
        return "user";
    }

    //관리자만 가능
    @ResponseBody
    @GetMapping("/admin")
    public String admin(){
        return "user";
    }

    //일반 로그인
    @ResponseBody
    @GetMapping("/principal")
    public ResponseEntity<SwaggerRespDto<? extends PrincipalDetails>> getPrincipalDetails(@AuthenticationPrincipal PrincipalDetails principalDetails) {

        if (principalDetails != null) {
            principalDetails.getAuthorities();
            System.out.println("role : " + principalDetails.getAuthorities());

            return ResponseEntity
                    .ok()
                    .body(new SwaggerRespDto<>(HttpStatus.OK.value(), "Success", principalDetails));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new SwaggerRespDto<>(HttpStatus.BAD_REQUEST.value(), "failed", null));
        }
    }
}
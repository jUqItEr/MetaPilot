package com.dita.metapilot.user.controller;

import com.dita.metapilot.log.dto.SwaggerRespDto;
import com.dita.metapilot.security.PrincipalDetails;
import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/login")
    public String loginPage() {
        return "user/login.html";
    }

    @ResponseBody
    @PostMapping("/api/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto, BindingResult bindingResult) {
        return ResponseEntity.ok(userService.registerUser(registerDto));
    }

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

    @ResponseBody
    @GetMapping("/principal")
    public ResponseEntity<SwaggerRespDto<? extends PrincipalDetails>> getPrincipalDetails(@AuthenticationPrincipal PrincipalDetails principalDetails) {

        if (principalDetails != null) {
            principalDetails.getAuthorities().forEach(role -> {
                System.out.println("로그인된 사용자의 권한 : {}" + role.getAuthority());
            });
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new SwaggerRespDto<>(HttpStatus.OK.value(), "failed", null));
        }

        return ResponseEntity
                .ok()
                .body(new SwaggerRespDto<>(HttpStatus.OK.value(), "Success", principalDetails));
    }
}
package com.dita.metapilot.user.controller;

import com.dita.metapilot.admin.dto.UserRoleDto;
import com.dita.metapilot.admin.service.AdminService;
import com.dita.metapilot.exception.CustomValidationException;
import com.dita.metapilot.log.dto.SwaggerRespDto;
import com.dita.metapilot.security.PrincipalDetails;
import com.dita.metapilot.user.dto.PrincipalDto;
import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.entity.RoleEntity;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.entity.UserRoleEntity;
import com.dita.metapilot.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

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
public class UserController {
    private final AdminService adminService;
    private final UserService userService;

    /**
     * <p>회원가입 요청을 처리하는 컨트롤러 메서드</p>
     *
     * @param registerDto 회원가입 요청 시 필요한 사용자 정보를 담은 DTO
     * @param bindingResult 요청 데이터의 검증 결과를 담은 객체
     * @since 2023. 11. 28.
     * @return ResponseEntity 객체를 반환하며, 회원가입이 성공적으로 처리되었을 경우 서비스 계층에서 반환된 결과를 포함
     */
    @ResponseBody
    @PostMapping("/api/token/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto, BindingResult bindingResult) {
        return ResponseEntity.ok(userService.registerUser(registerDto));
    }

    @ResponseBody
    @PostMapping("/api/token/welcome")
    public ResponseEntity<?> createAdmin() {
        boolean result = !userService.duplicateUserId("admin");

        if (result) {
            RegisterDto registerDto = new RegisterDto();
            registerDto.setId("admin");
            registerDto.setPassword(new BCryptPasswordEncoder().encode("1234"));
            registerDto.setNickname("관리자");

            userService.registerUser(registerDto);
            adminService.updateUserRole(new UserRoleDto("admin", 3));
        }
        return ResponseEntity.ok(result);
    }


    @ResponseBody
    @PostMapping("/api/token/checkUserId")
    public ResponseEntity<?> checkUserId(@RequestParam String userId) {
        return ResponseEntity.ok(userService.duplicateUserId(userId));
    }

    /**
     * <p>유저 정보를 전부 가져오는 메소드</p>
     *
     * @since 2023. 11. 29.
     * @return 사용자의 정보를 판단하여 결과값 반환
     */
    @ResponseBody
    @PostMapping("/api/token/principal")
    public ResponseEntity<?> getPrincipal() {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = principalDetails.getUser();
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

}
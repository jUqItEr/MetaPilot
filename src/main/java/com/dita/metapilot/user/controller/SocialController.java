package com.dita.metapilot.user.controller;

import com.dita.metapilot.log.dto.SwaggerRespDto;
import com.dita.metapilot.security.PrincipalDetails;
import com.dita.metapilot.user.dto.SocialRegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.service.SocialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/social")
public class SocialController {

    private final SocialService socialService;

    @ResponseBody
    @GetMapping("/test/login")
    public String testLogin(@AuthenticationPrincipal PrincipalDetails userDetails){ //AuthenticationPrincipal 이걸로 세션에 접근가능함
        System.out.println("/test/login==============");
        System.out.println("userDetails: " + userDetails.getUser());
        return "세션 정보 확인하기";
    }

    @ResponseBody
    @GetMapping("/test/oauth/login")
    public String testOAuthLogin(@AuthenticationPrincipal OAuth2User oauth){
        System.out.println("/test/oauth/login==============");
        System.out.println("oauth2User : " + oauth.getAttributes());
        return "OAuth 세션 정보 확인";
    }


    // OAuth 로그인 + 일반 로그인 모두 PrincipalDetails로 받음.
    @GetMapping("/user")
    @ResponseBody
    public String user(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails: "+principalDetails.getUser());
        return "user";
    }

    @ResponseBody
    @GetMapping("/{socialId}")
    public ResponseEntity<? extends SwaggerRespDto<? extends UserEntity>> getUser(@PathVariable String socialId) {
        UserEntity user = socialService.getUser(socialId);
        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new SwaggerRespDto<>(HttpStatus.NOT_FOUND.value(), "User not found", null));
        }
        return ResponseEntity
                .ok()
                .body(new SwaggerRespDto<>(HttpStatus.OK.value(), "Success", user));
    }
}

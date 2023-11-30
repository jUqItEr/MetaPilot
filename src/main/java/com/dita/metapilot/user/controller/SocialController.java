package com.dita.metapilot.user.controller;

import com.dita.metapilot.log.dto.SwaggerRespDto;
import com.dita.metapilot.user.dto.SocialRegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.service.SocialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @ResponseBody
    @PostMapping("/api/register")
    public ResponseEntity<?> signup(@Valid @RequestBody SocialRegisterDto socialRegisterDto, BindingResult bindingResult) {
        return ResponseEntity.ok(socialService.registerUser(socialRegisterDto));
    }
}

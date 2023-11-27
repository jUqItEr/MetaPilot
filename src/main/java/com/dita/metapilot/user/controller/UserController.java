package com.dita.metapilot.user.controller;

import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String loginPage() {
        return "user/login.html";
    }

    @ResponseBody
    @PostMapping("/api/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto, BindingResult bindingResult) {
        return ResponseEntity.ok(userService.registerUser(registerDto));
    }




}
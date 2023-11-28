package com.dita.metapilot.user.service;

import com.dita.metapilot.exception.CustomValidationException;
import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public RegisterDto registerUser(RegisterDto registerDto) {
        registerDto.setPassword(new BCryptPasswordEncoder().encode(registerDto.getPassword()));
        userRepository.findUserByUserId(registerDto.getId());
        userRepository.registerUser(registerDto);
        return registerDto;
    }

    public void duplicateUserId(String userId) {
        UserEntity user = userRepository.findUserByUserId(userId);

        if (user != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("userId", "이미 존재하는 사용자 아이디 입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public UserEntity getUser(String userId) {
        return userRepository.getUser(userId);
    }
}
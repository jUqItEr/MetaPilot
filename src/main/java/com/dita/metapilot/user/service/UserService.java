package com.dita.metapilot.user.service;

import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public RegisterDto registerUser(RegisterDto registerDto) {
        registerDto.setPassword(new BCryptPasswordEncoder().encode(registerDto.getPassword()));
        userRepository.saveUser(registerDto);
        return registerDto;
    }
}
package com.dita.metapilot.user.service;

import com.dita.metapilot.exception.CustomValidationException;
import com.dita.metapilot.exception.DuplicateException;
import com.dita.metapilot.user.dto.SocialRegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.repository.SocialRepository;
import com.dita.metapilot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class SocialService {

    private final SocialRepository socialRepository;
    private final UserRepository userRepository;

    public SocialRegisterDto registerUser(SocialRegisterDto socialRegisterDto) {
        responseDuplicateError(socialRegisterDto);
        socialRepository.createUser(socialRegisterDto);
        socialRepository.createRole(socialRegisterDto);
        return socialRegisterDto;
    }

    public void responseDuplicateError(SocialRegisterDto socialRegisterDto) {
        UserEntity user = socialRepository.checkDuplicate(socialRegisterDto);

        if (user != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("email", "이미 존재하는 사용자 아이디 입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public UserEntity getUser(String socialId) {
        return socialRepository.getUser(socialId);
    }
}

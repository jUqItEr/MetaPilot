package com.dita.metapilot.user.service;

import com.dita.metapilot.exception.CustomValidationException;
import com.dita.metapilot.exception.DuplicateException;
import com.dita.metapilot.user.dto.SocialRegisterDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.repository.SocialRepository;
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

//    public boolean registerUser(SocialRegisterDto socialRegisterDto) {
//
//    }

    public void responseDuplicateError(boolean errorCode) {
        Map<String, String> errorMap = new HashMap<>();
        if (errorCode) {
            errorMap.put("socialId", "이미 사용중인 소셜 이메일입니다.");
        }
        throw new DuplicateException(errorMap);
    }

    public UserEntity getUser(String socialId) {
        return socialRepository.getUser(socialId);
    }
}

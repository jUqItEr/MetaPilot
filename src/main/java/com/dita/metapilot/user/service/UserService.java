package com.dita.metapilot.user.service;

import com.dita.metapilot.exception.CustomValidationException;
import com.dita.metapilot.user.dto.RegisterDto;
import com.dita.metapilot.user.dto.TokenDto;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>사용자 관련 서비스를 제공하는 클래스</p>
 *
 * @author 권명승 (@myeongseung)
 * @since 2023. 11. 27.
 * @version 1.0.0
 * */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * <p>사용자를 등록하는 서비스 메서드.</p>
     *
     * <p>1. 사용자의 비밀번호를 BCryptPasswordEncoder를 사용하여 암호화</p>
     * <p>2. 사용자 ID의 중복 여부를 확인하기 위해 'findUserByUserId' 메서드를 호출</p>
     * <p>3. 'registerUser' 메서드를 통해 사용자 정보를 데이터베이스에 등록합니다.</p>
     * <p>4. 'createRole' 메서드를 사용하여 사용자의 역할을 생성하고 저장합니다.</p>
     * @param registerDto 사용자 등록에 필요한 정보를 담은 DTO.
     * @return 등록된 사용자 정보가 담긴 DTO.
     */
    public RegisterDto registerUser(RegisterDto registerDto) {
        registerDto.setPassword(new BCryptPasswordEncoder().encode(registerDto.getPassword()));
        userRepository.findUserByUserId(registerDto.getId());
        userRepository.registerUser(registerDto);
        userRepository.createRole(registerDto);
        return registerDto;
    }

    /**
     * 사용자 ID의 중복을 확인하는 메서드.
     *
     * @param userId 중복 확인을 할 사용자 ID.
     * @throws CustomValidationException 중복된 사용자 ID가 존재하는 경우 예외를 발생
     */
    public boolean duplicateUserId(String userId) {
        return userRepository.findUserByUserId(userId);
    }

    /**
     * 특정 사용자의 정보를 조회하는 메서드.
     *
     * @param userId 조회할 사용자의 ID.
     * @return 해당 ID를 가진 사용자의 UserEntity 객체. 사용자가 존재하지 않으면 null을 반환합니다.
     */
    public UserEntity getUser(String userId) {
        return userRepository.getUser(userId);
    }
}
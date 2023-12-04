package com.dita.metapilot.security;

import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 시큐리티 설정에서 loginProcessingUrl("/login");
 * /login 요청이 오면 자동으로 UserDetailsService타입으로 IoC되어 있는 loadUserByUsername 함수가 실행
 *
 * <p>Spring Security의 UserDetailsService 인터페이스 구현체. 실질적인 로그인 역할</p>
 *
 * <p>사용자의 인증 정보를 로드하는 역할</p>
 * <p>Spring Security 설정에서 이 서비스를 사용하여 사용자의 인증 정보를 조회하고,</p>
 * <p>인증 과정에서 사용</p>
 * @author 권명승 (@myeongseung)
 * @since 2023. 11. 28.
 * @version 1.0.0
 *
 */

// http://localhost:8000/login <- 스프링 시큐리티 기본 로그인 요청 주소가 요기임
@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService의 loadUserByUserId");
        UserEntity user = userRepository.getUser(userId);
        userRepository.userVisit(userId);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new PrincipalDetails(user);
    }
}
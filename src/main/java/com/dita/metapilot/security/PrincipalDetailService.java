package com.dita.metapilot.security;

import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
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
@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * 주어진 사용자 ID로 사용자의 인증 정보를 로드하는 메서드.
     *
     * @param userId 사용자 ID.
     * @return UserDetails 인터페이스를 구현한 PrincipalDetails 객체.
     * @throws UsernameNotFoundException 사용자를 찾을 수 없을 때 예외를 발생시킵니다.
     */
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        UserEntity user = userRepository.getUser(userId);
        userRepository.userVisit(userId);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new PrincipalDetails(user);
    }
}

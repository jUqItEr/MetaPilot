package com.dita.metapilot.security;

import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        UserEntity user = userRepository.getUser(userId);

        if (user == null) {
            System.out.println("회원 정보를 확인 할 수 없음.");
        }
        return new PrincipalDetails(user);
    }
}

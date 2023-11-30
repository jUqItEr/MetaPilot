package com.dita.metapilot.security;

import com.dita.metapilot.user.entity.RoleEntity;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.entity.UserRoleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

/**
 * <p>인증된 사용자의 상세 정보를 제공하는 클래스.</p>
 *
 * <p>Spring Security의 UserDetails 인터페이스를 구현</p>
 * <p>인증된 사용자의 정보 및 권한을 제공</p>
 * @author 권명승 (@myeongseung)
 * @since 2023. 11. 28.
 * @version 1.0.0
 *
 */
@RequiredArgsConstructor
@Slf4j
public class PrincipalDetails implements UserDetails {

    @Getter
    private final UserEntity user;
    private Map<String, Object> response;

    /**
     * 사용자에게 부여된 권한을 반환하는 메서드.
     *
     * @return 사용자에게 부여된 권한 목록.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (UserRoleEntity userRoleEntity : user.getUserRoleEntities()) {
            authorities.add(new SimpleGrantedAuthority(userRoleEntity.getRoleEntity().getName()));
            log.info(userRoleEntity.getRoleEntity().getName()); //TODO
        }
        return authorities;
    }

    // 사용자의 비밀번호를 반환
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // 사용자의 이름을 반환
    @Override
    public String getUsername() {
        return user.getId();
    }

    // 계정의 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정의 잠김 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정의 활성화 여부 반환
    @Override
    public boolean isEnabled() {
        return true;
    }
}

package com.dita.metapilot.security;

import com.dita.metapilot.user.entity.RoleEntity;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.entity.UserRoleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

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
@Slf4j
@Data
public class PrincipalDetails implements UserDetails, OAuth2User {

    @Getter
    private UserEntity user;
    private Map<String, Object> attributes;

    //일반 로그인
    public PrincipalDetails(UserEntity user){
        this.user = user;
    }

    //OAuth 로그인
    public PrincipalDetails(UserEntity user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }



    /**
     * 사용자에게 부여된 권한을 반환하는 메서드.
     *
     * @return 사용자에게 부여된 권한 목록.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        if (user != null) {
            UserRoleEntity userRoleEntity = user.getUserRoleEntities();
            if (userRoleEntity != null) {
                RoleEntity role = userRoleEntity.getRoleEntity();
                if (role != null) {
                    authorities.add(new SimpleGrantedAuthority(role.getName()));
                }
            }
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER")); // 기본 권한
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

    //-----------------------------------------------------------OAUTH2
    @Override
    public String getName() {
        return null;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
}

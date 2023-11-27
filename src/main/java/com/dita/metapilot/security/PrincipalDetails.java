package com.dita.metapilot.security;

import com.dita.metapilot.user.entity.RoleEntity;
import com.dita.metapilot.user.entity.UserEntity;
import com.dita.metapilot.user.entity.UserRoleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@RequiredArgsConstructor
public class PrincipalDetails implements UserDetails {

    @Getter
    private final UserEntity user;
    private Map<String, Object> response;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        List<UserRoleEntity> roleEntities = user.getUserRoleEntities();
        for(int i = 0;i < roleEntities.size();i++) {
            UserRoleEntity userRoleEntity = roleEntities.get(i);
            RoleEntity roleEntity = userRoleEntity.getRoleEntity();
            String roleName = roleEntity.getName();

            GrantedAuthority role = new GrantedAuthority() {
                @Override
                public String getAuthority() {
                    return roleName;
                }
            };
            authorities.add(role);
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
        return false;
    }

    // 계정의 잠김 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    // 비밀번호 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    // 계정의 활성화 여부 반환
    @Override
    public boolean isEnabled() {
        return false;
    }
}

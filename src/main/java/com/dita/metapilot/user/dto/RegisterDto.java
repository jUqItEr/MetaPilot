package com.dita.metapilot.user.dto;

import com.dita.metapilot.user.entity.UserRoleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String id;
    private String password;
    private String nickname;
    private String email;
    private List<UserRoleEntity> userRoleEntities;
}
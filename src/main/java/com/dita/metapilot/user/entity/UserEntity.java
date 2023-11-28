package com.dita.metapilot.user.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    private String id;
    private String password;
    private String nickname;
    private String email;
    private String oauthId;
    private String profileImage;
    private String createdAt;
    private String visitedAt;
    private List<UserRoleEntity> userRoleEntities;
}
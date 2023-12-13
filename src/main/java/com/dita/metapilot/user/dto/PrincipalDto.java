package com.dita.metapilot.user.dto;

import com.dita.metapilot.user.entity.UserRoleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrincipalDto {
    private String id;
    private String nickname;
    private String provider;
    private String socialId;
    private String profileImage;
    private String createdAt;
    private String visitedAt;
    private UserRoleEntity userRoleEntities;
}

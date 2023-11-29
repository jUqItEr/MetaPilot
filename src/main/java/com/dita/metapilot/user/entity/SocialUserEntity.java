package com.dita.metapilot.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SocialUserEntity {
    private String id;
    private String nickname;
    private String email;
    private String socialId;
    private String profileImage;
    private String createdAt;
    private String visitedAt;
}

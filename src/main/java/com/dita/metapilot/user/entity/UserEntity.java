package com.dita.metapilot.user.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 사용자 정보를 나타내는 엔티티 클래스.
 *
 * 필드:
 * <p>- id: 사용자의 고유 식별자.</p>
 * <p>- password: 사용자의 비밀번호.</p>
 * <p>- nickname: 사용자의 별명.</p>
 * <p>- email: 사용자의 이메일 주소.</p>
 * <p>- oauthId: OAuth 인증을 통해 얻은 사용자 식별자.</p>
 * <p>- profileImage: 사용자의 프로필 이미지 URL.</p>
 * <p>- createdAt: 사용자가 생성된 날짜 및 시간.</p>
 * <p>- visitedAt: 사용자의 마지막 방문 날짜 및 시간.</p>
 * <p>- userRoleEntities: 사용자의 역할 정보를 포함하는 UserRoleEntity 객체의 리스트.</p>
 *
 */
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
package com.dita.metapilot.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 사용자의 역할 정보를 나타내는 엔티티 클래스.
 *
 * <p>필드:</p>
 * <p>- userId: 사용자의 고유 식별자</p>
 * <p>- roleId: 역할의 고유 식별자</p>
 * <p>- roleEntity 객체로, 해당 사용자의 역할에 대한 상세 정보를 포함합니다.</p>
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRoleEntity {
    private String userId;
    private int roleId;
    private RoleEntity roleEntity;
}

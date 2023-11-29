package com.dita.metapilot.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 역할 정보를 나타내는 엔티티 클래스.
 *
 * <p>필드:</p>
 * <p>- id: 역할의 고유 식별자</p>
 * <p>- name: 역할의 이름</p>
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleEntity {
    private int id;
    private String name;
}

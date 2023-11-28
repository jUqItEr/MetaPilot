package com.dita.metapilot.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRoleEntity {
    private String userId;
    private int roleId;
    private RoleEntity roleEntity;
}

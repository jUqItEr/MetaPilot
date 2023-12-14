package com.dita.metapilot.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.annotations.Param;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleEntity {
    private String userId;
    private int roleId;
}

package com.dita.metapilot.user.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String id;
    private String password;
}

package com.dita.metapilot.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialRegisterDto {
    private String id;
    private String socialId;
    private String email;
    private String nickname;
}

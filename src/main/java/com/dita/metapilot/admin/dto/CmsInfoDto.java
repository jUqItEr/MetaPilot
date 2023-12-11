package com.dita.metapilot.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CmsInfoDto {
    private String title;
    private String profile;
    private String profileImage;
    private String googleAnalytics;
}
package com.dita.metapilot.main.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CmsInfoEntity {
    private String title;
    private int layoutId;
    private String profile;
    private String profileImage;
    private String googleAnalytics;
}

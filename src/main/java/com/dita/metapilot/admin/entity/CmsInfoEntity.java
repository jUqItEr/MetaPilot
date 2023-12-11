package com.dita.metapilot.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CmsInfoEntity {
    private int id;
    private String title;
    private int layoutId;
    private String profile;
    private String profileImage;
    private String googleAnalytics;
}
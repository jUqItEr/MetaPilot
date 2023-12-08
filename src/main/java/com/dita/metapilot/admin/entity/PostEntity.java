package com.dita.metapilot.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {
    private int id;
    private int categoryTblId;
    private String userTblId;
    private String subject;
    private String content;
    private int count;
    private int notice;
    private int deleted;
    private int type;
    private String createdAt;
}

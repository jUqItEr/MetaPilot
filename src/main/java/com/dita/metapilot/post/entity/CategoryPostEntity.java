package com.dita.metapilot.post.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPostEntity {
    private int categoryId;
    private String categorySubject;
    private int id;
    private int categoryTblId;
    private String userTblId;
    private String subject;
    private String content;
    private int count;
    private int notice;
    private int deleted;
    private String thumbnail;
    private int type;
    private String createdAt;
}

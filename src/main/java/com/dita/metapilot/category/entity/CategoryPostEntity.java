package com.dita.metapilot.category.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPostEntity {
    private int id;
    private long postId;
    private String userId;
    private String subject;
    private long count;
    private String thumbnail;
    private String createdAt;
}

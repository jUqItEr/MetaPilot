package com.dita.metapilot.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagingDto {
    private int postCount;
    private String subject;
    private int commentCount;
    private String createdDate;
    private String createdAt;
    private int limitCount;
    private int pageNum;
}

package com.dita.metapilot.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostSearchDto {
    private int id;
    private int categoryTblId;
    private String userTblId;
    private String subject;
    private String content;
    private int count;
    private int deleted;
    private int type;
    private String createdAt;
}

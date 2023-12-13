package com.dita.metapilot.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostPopularDto {
    private long id;
    private int categoryId;
    private String categorySubject;
    private String subject;
    private String thumbnail;
}

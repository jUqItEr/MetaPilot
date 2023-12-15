package com.dita.metapilot.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefDto {
    private long id;
    private long postId;
    private long refId;
    private long rootId;
    private String userId;
    private String content;
    private int depth;
    private int visible;
    private String createdAt;
}

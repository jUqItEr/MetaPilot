package com.dita.metapilot.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefCommentDto {
    private long id;
    private long postId;
    private long commentRefId;
    private long commentRootId;
    private String userId;
    private String content;
    private int depth;
    private int pos;
    private int visible;
    private String createdAt;
}

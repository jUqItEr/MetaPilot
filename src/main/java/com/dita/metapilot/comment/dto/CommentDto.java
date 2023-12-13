package com.dita.metapilot.comment.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private long id;
    private long postId;
    private Long commentRefId;
    private Long commentRootId;
    private String userId;
    private String content;
}

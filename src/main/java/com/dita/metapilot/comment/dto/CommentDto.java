package com.dita.metapilot.comment.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private long id;
    private String content;
    private int visible;
}

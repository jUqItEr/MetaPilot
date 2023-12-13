package com.dita.metapilot.comment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeEntity {
    private long id;
    private long commentId;
    private String userId;
}

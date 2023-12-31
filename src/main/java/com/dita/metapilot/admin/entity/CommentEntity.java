package com.dita.metapilot.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    private int id;
    private int postId;
    private int refId;
    private int rootId;
    private String userId;
    private String content;
    private int depth;
    private int pos;
    private int visible;
    private String createdAt;
    private String postSubject;
    private String nickname;
}

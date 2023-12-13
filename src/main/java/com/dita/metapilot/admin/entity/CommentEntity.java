package com.dita.metapilot.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    private int id;
    private int postTblId;
    private int commentTblRefId;
    private int commentTblRootId;
    private String userTblId;
    private String content;
    private int depth;
    private int pos;
    private int visible;
    private String createdAt;
    private int postId;
    private String postUserTblId;
    private String postSubject;
    private String nickname;
}

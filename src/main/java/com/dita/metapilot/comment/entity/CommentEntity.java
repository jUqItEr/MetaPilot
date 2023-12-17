package com.dita.metapilot.comment.entity;

import lombok.*;
import org.attoparser.dom.Text;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentEntity {
    private long id;
    private long postId;
    private long refId;
    private long rootId;
    private String userId;
    private String content;
    private int depth;
    private int pos;
    private int visible;
    private String createdAt;
    private String nickname;
    private String refNickname;
    private String profileImage;
    private int likeCount;
}

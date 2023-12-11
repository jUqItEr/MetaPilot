package com.dita.metapilot.post.entity;

import com.dita.metapilot.post.dto.HashtagDto;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {
    private int postId;
    private int categoryId;
    private String userId;
    private String subject;
    private String content;
    private int count;
    private int notice;
    private int deleted;
    private int type;
    private String createdAt;
    private int likeCount;
}

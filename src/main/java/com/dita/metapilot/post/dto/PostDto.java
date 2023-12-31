package com.dita.metapilot.post.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

/**
 * <p>작성할 게시글 정보가 담긴 DTO.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private long postId;
    private int categoryId;
    private String userId;
    private String subject;
    private String content;
    private int notice;
    private String thumbnail;
    private int type;
    private String createdAt;
}

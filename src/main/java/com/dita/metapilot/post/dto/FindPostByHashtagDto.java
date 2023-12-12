package com.dita.metapilot.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * <p>해시태그로 게시글을 검색했을때의 정보를 담은 DTO.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindPostByHashtagDto {
    private long postId;
    private int categoryId;
    private String userId;
    private String subject;
    private String content;
    private int type;
    private String createdAt;
    private int likeCount;
    private List<HashtagDto> hashtags;
}

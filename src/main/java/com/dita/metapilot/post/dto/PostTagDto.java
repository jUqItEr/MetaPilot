package com.dita.metapilot.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>게시글과 해시태그를 연결했을때 정보가 담기는 DTO.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostTagDto {
    private long postId;
    private long hashtagId;
    private String cratedAt;
}

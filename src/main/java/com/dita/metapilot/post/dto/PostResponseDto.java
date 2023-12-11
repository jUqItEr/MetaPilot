package com.dita.metapilot.post.dto;

import lombok.*;

/**
 * <p>게시글 번호와 사용자 ID를 담은 DTO.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDto {
    private int postId;
    private String userId;
}

package com.dita.metapilot.post.dto;

import com.dita.metapilot.post.entity.PostEntity;
import com.dita.metapilot.post.postFile.dto.PostFileDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * <p>게시글 정보와 해시태그 정보가 담긴 DTO.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostViewDto {
    private PostEntity post;
    private List<HashtagDto> hashtags;
    private List<PostFileDto> files;
}

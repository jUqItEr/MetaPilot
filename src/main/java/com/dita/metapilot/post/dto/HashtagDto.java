package com.dita.metapilot.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * <p>해시태그 정보가 담긴 DTO.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HashtagDto {
    private int hashtagId;
    private String content;
}

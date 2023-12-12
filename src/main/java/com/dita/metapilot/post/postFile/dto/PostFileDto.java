package com.dita.metapilot.post.postFile.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostFileDto {
    private long postId;
    private String name;
    private String originalName;
    private String extension;
    private long fileSize;
    private int type;
}

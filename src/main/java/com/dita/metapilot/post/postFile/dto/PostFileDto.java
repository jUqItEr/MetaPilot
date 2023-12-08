package com.dita.metapilot.post.postFile.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostFileDto {
    private int postId;
    private String name;
    private String originalName;
    private String extension;
    private int filesize;
}

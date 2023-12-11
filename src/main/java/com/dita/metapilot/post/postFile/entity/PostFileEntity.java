package com.dita.metapilot.post.postFile.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostFileEntity {
    private int id;
    private int postId;
    private String name;
    private String originalName;
    private String extension;
    private int filesize;
}

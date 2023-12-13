package com.dita.metapilot.comment.file.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileEntity {
    private long id;
    private long commentId;
    private String name;
    private String originalName;
    private String extension;
    private long fileSize;


}

package com.dita.metapilot.comment.file.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileDto {
    private int commentId; // 댓글의 고유 식별자
    private String name; // 파일 이름
    private String originalName; // 파일의 원래 이름
    private String extension; // 파일 확장자
    private long fileSize; // 파일 크기


}

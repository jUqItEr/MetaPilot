package com.dita.metapilot.comment.file.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileIdDto {
    private long commentId; // 댓글의 고유 식별자
}

package com.dita.metapilot.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    private long commentId; // 수정된 필드명
    private String userId; // 수정된 필드명

}

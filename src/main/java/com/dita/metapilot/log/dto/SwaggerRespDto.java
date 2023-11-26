package com.dita.metapilot.log.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * <p>Swagger 통신용 공용 메시지 구조체</p>
 *
 * @author Myeongseung Kwon (@myeongseung)
 * @version 1.0.0
 * @since 23.11.21
 * */
@AllArgsConstructor
@Data
public class SwaggerRespDto<T> {
    @Schema(defaultValue = "HTTP Status Code", example = "200")
    private int code;

    @Schema(defaultValue = "Response", example = "Success")
    private String message;
    private T data;
}

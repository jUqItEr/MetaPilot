package com.dita.metapilot.admin.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CategoryDto {
    private int id;
    private String subject;
    private int depth;
    private int pos;
    private int type;
    private int isVisible;
    private int isCountVisible;
}

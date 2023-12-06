package com.dita.metapilot.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private int id;
    private String subject;
    private int categoryTblRefId;
    private int depth;
    private int pos;
    private int type;
    private int visible;
    private int countVisible;
}

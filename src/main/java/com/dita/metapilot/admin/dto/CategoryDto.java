package com.dita.metapilot.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private int id;
    private int categoryTblRefId;
    private String subject;
    private int depth;
    private int pos;
    private int type;
    private int visible;
    private int fold;
    private int countVisible;
    private int listVisible;
    private int listCount;
    private int postCount;
    private int refCount;
}

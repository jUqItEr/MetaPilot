package com.dita.metapilot.category.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {
    private int id;
    private int refId;
    private String subject;
    private int depth;
    private int pos;
    private int type;
    private int fold;
    private int visible;
    private int countVisible;
    private int listVisible;
    private int listCount;
    private String createdAt;
}

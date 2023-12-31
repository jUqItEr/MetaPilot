package com.dita.metapilot.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {
    private int id;
    private int categoryTblRefId;
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
    private int postCount;
    private int refCount;
    private int totalCount;
}

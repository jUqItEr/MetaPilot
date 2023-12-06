package com.dita.metapilot.category.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPostEntity {
    private int id;
    private String cSubject;
    private int categoryTblRefId;
    private String userTblId;
    private String subject;
    private int count;
    private String createdAt;
}

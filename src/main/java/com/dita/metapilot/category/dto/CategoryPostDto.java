package com.dita.metapilot.category.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPostDto {
    private int categoryId;
    private String cSubject;
    private String categorySubject;
    private int postCategoryId;
    private String postSubject;
}

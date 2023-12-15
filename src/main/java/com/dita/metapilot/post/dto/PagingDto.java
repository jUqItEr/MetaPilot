package com.dita.metapilot.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagingDto {

    private String limit;
    private int page;
    private int count;
    private int index;
    private String userId;
    private int categoryId;
    
    private String searchValue; //검색어
    private String option; //옵션

    public void setIndex() {
        index = (page - 1) * count;
    }
}

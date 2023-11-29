package com.dita.metapilot.admin.repository;

import com.dita.metapilot.admin.dto.CategoryDto;
import com.dita.metapilot.admin.dto.PostDto;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>Mybatis mapper interface for admin.</p>
 *
 * @author Kiseok Kang (@jUqItEr)
 * @since 2023. 11. 28.
 * @version 1.0.0
 * */
@Mapper
public interface AdminRepository {
    /**
     * <p>Create category.</p>
     *
     * @since 2023. 11. 28.
     * @param dto Category Data Transfer Object
     * @return It should be return true if an item is created successfully.
     * */
    boolean createCategory(CategoryDto dto);

    /**
     * <p>Delete category.</p>
     *
     * @since 2023. 11. 28.
     * @param dto Category Data Transfer Object.
     * @return It should be return true if an item is deleted successfully.
     * */
    boolean deleteCategory(CategoryDto dto);

    /**
     * <p>Update category.</p>
     *
     * @since 2023. 11. 28.
     * @param dto Category Data Transfer Object.
     * @return It should be return true if an item is updated successfully.
     * */
    boolean updateCategory(CategoryDto dto);

    /**
     * <p>Delete post.</p>
     * */
    boolean deletePost(PostDto dto);


}

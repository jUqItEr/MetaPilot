package com.dita.metapilot.admin.repository;

import com.dita.metapilot.admin.dto.CategoryDto;
import com.dita.metapilot.admin.dto.PostDto;
import com.dita.metapilot.admin.dto.UserDto;
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
     * <p>Block user.</p>
     *
     * @since 2023. 11. 29.
     * @param dto User Data Transfer Object.
     * @return It'll be return true if the user can block successfully.
     * */
    boolean blockUser(UserDto dto);

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
     *
     * @since 2023. 11. 29.
     * @param dto Post Data Transfer Object.
     * @return It should be return true if an item deleted successfully.
     * */
    boolean deletePost(PostDto dto);


}

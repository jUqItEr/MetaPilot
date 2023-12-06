package com.dita.metapilot.admin.repository;

import com.dita.metapilot.admin.dto.CategoryDto;
import com.dita.metapilot.admin.dto.PostDto;
import com.dita.metapilot.admin.dto.UserDto;
import com.dita.metapilot.admin.entity.CategoryEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

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
     * <p>카테고리를 List하는 기능</p>
     * @since 2023. 11. 28.
     * @return 모든 카테고리를 List에 담습니다.
     */
    List<CategoryEntity> categoryView();

    /**
     * <p>Create category.</p>
     *
     * @since 2023. 11. 28.
     * @param categoryDto Category Data Transfer Object
     * @return It should be return true if an item is created successfully.
     * */
    boolean createCategory(CategoryDto categoryDto);

    /**
     * <p> 카테고리 구분선 생성 </p>
     * <p> 23.12.05 - 사용자가 특정 카테고리 창을 클릭한 뒤에 [카테고리 추가]버튼을 클릭하면 자동으로 적절한 위치에 생성시키는 기능 추가. </p>
     * @since 2023. 12. 05.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean createCategoryLine(CategoryDto categoryDto);

    /**
     * <p>카테고리 삭제. 카테고리를 삭제하면 해당 삭제한 카테고리의 {절대 경로 pos}보다 높은 모든 데이터의 {절대 경로 pos}값을 -1 합니다.</p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean deleteCategory(CategoryDto categoryDto);

    /**
     * <p>카테고리 수정</p>
     * @since 2023. 11. 30.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean updateCategory(CategoryDto categoryDto);

    /**
     * <p>Delete post.</p>
     *
     * @since 2023. 11. 29.
     * @param dto Post Data Transfer Object.
     * @return It should be return true if an item deleted successfully.
     * */
    boolean deletePost(PostDto dto);

    /**
     * <p>카테고리의 헤더를 List하는 기능</p>
     * @since 2023. 12. 04.
     * @return 카테고리 중 헤더를 List에 담습니다.
     */
    List<CategoryEntity> categoryHeader();
}

package com.dita.metapilot.category.repository;

import com.dita.metapilot.category.dto.CategoryDto;
import com.dita.metapilot.category.dto.CategoryPostDto;
import com.dita.metapilot.category.entity.CategoryCountEntity;
import com.dita.metapilot.category.entity.CategoryEntity;
import com.dita.metapilot.category.entity.CategoryPostEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 카테고리 Repository
 *
 * @author Ha Seong Kim
 * @since 2023. 12. 04.
 * @version 1.0.0
 * */
@Mapper
public interface CategoryRepository {
    /**
     * <p>카테고리를 List하는 기능</p>
     * @since 2023. 11. 28.
     * @return 모든 카테고리를 List에 담습니다.
     */
    List<CategoryEntity> categoryView();



    /**
     * <p>특정 카테고리를 선택하면 해당 카테고리에 포함된 게시글들을 List에 담습니다. </p>
     * @since 2023. 11. 28.
     * @param categoryPostDto 카테고리 데이터를 전송하는 객체
     * @return 모든 카테고리를 List에 담습니다.
     */
    List<CategoryPostEntity> categoryPostView(CategoryPostDto categoryPostDto);


    /**
     * <p>특정 카테고리를 선택하면 해당 카테고리에 포함된 게시글들을 List에 담습니다. </p>
     * @since 2023. 12. 11.
     * @param categoryPostDto 카테고리 데이터를 전송하는 객체
     * @return 모든 카테고리를 List에 담습니다.
     */
    Long getRecentPostId(CategoryPostDto categoryPostDto);

    /**
     * <p>카테고리 생성 </p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean createCategory(CategoryDto categoryDto);



    /**
     * <p>카테고리 구분선 생성 </p>
     * @since 2023. 11. 29.
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
     * <p>카테고리의 위치를 한 칸 올리는 기능 (사용할 지는 모르겠으나 일단 보류)</p>
     * @since 2023. 12. 02.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean updateCategoryUp(CategoryDto categoryDto);



    /**
     * <p>카테고리의 위치를 한 칸 내리는 기능 (사용할 지는 모르겠으나 일단 보류)</p>
     * @since 2023. 12. 02.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    boolean updateCategoryDown(CategoryDto categoryDto);



    /**
     * <p>카테고리의 헤더를 List하는 기능</p>
     * @since 2023. 12. 04.
     * @return 카테고리 중 헤더를 List에 담습니다.
     */
    List<CategoryEntity> categoryHeader();

    CategoryEntity getCategoryInfo(int id);


    List<CategoryCountEntity> categoryPostCount();

}

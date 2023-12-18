package com.dita.metapilot.category.service;

import com.dita.metapilot.category.dto.CategoryDto;
import com.dita.metapilot.category.dto.CategoryPostDto;
import com.dita.metapilot.category.entity.CategoryCountEntity;
import com.dita.metapilot.category.entity.CategoryEntity;
import com.dita.metapilot.category.entity.CategoryPostEntity;
import com.dita.metapilot.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 카테고리 Service 입니다.
 *
 * @author Ha Seong Kim
 * @since 2023. 11. 28.
 * @version 1.0.0
 * */
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;


    public CategoryEntity getCategoryInfo(int id) {
        return categoryRepository.getCategoryInfo(id);
    }


    /**
     * <p>카테고리를 List하는 기능</p>
     * @since 2023. 11. 28.
     * @return 모든 카테고리를 List에 담습니다.
     */
    public List<CategoryEntity> categoryView() {
        return categoryRepository.categoryView();
    }



    /**
     * <p>특정 카테고리를 선택하면 해당 카테고리에 포함된 게시글들을 List에 담습니다. </p>
     * @since 2023. 11. 28.
     * @param categoryPostDto 카테고리 데이터를 전송하는 객체
     * @return 모든 카테고리를 List에 담습니다.
     */
    public List<CategoryPostEntity> categoryPostView(CategoryPostDto categoryPostDto) {
        return categoryRepository.categoryPostView(categoryPostDto);
    }

    /**
     * <p>특정 카테고리를 선택하면 해당 카테고리에 포함된 게시글들을 List에 담습니다. </p>
     * @since 2023. 11. 28.
     * @param categoryPostDto 카테고리 데이터를 전송하는 객체
     * @return 모든 카테고리를 List에 담습니다.
     */
    public Long getRecentPostId(CategoryPostDto categoryPostDto) {
        System.out.println(categoryPostDto.getCategoryId());
        return categoryRepository.getRecentPostId(categoryPostDto);
    }



    /**
     * <p>카테고리 생성</p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto createCategory(CategoryDto categoryDto) {
        categoryRepository.createCategory(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리 구분선 생성</p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto createCategoryLine(CategoryDto categoryDto) {
        categoryRepository.createCategoryLine(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리 삭제. 카테고리를 삭제하면 해당 삭제한 카테고리의 {절대 경로 pos}보다 높은 모든 데이터의 {절대 경로 pos}값을 -1 합니다.</p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto deleteCategory(CategoryDto categoryDto) {
        categoryRepository.deleteCategory(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리 수정</p>
     * @since 2023. 11. 30.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto updateCategory(CategoryDto categoryDto) {
        categoryRepository.updateCategory(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리의 위치를 한 칸 올리는 기능 (사용할 지는 모르겠으나 일단 보류)</p>
     * @since 2023. 12. 02.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto updateCategoryUp(CategoryDto categoryDto) {
        categoryRepository.updateCategoryUp(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리의 위치를 한 칸 내리는 기능 (사용할 지는 모르겠으나 일단 보류)</p>
     * @since 2023. 12. 02.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto updateCategoryDown(CategoryDto categoryDto) {
        categoryRepository.updateCategoryDown(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리의 헤더를 List하는 기능</p>
     * @since 2023. 12. 04.
     * @return 카테고리의 헤더를 List에 담습니다.
     */
    public List<CategoryCountEntity> categoryPostCount(CategoryPostDto categoryPostDto) {
        return categoryRepository.categoryPostCount(categoryPostDto);
    }




    /**
     * <p>카테고리의 헤더를 List하는 기능</p>
     * @since 2023. 12. 04.
     * @return 카테고리의 헤더를 List에 담습니다.
     */
    public List<CategoryEntity> categoryHeader() {
        return categoryRepository.categoryHeader();
    }




}

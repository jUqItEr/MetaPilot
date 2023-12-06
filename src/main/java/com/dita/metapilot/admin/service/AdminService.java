package com.dita.metapilot.admin.service;

import com.dita.metapilot.admin.repository.AdminRepository;
import com.dita.metapilot.admin.entity.CategoryEntity;
import com.dita.metapilot.admin.dto.CategoryDto;
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
public class AdminService {

    /**
     * 카테고리 Repository를 불러옵니다.
     */
    private final AdminRepository adminRepository;

    /**
     * <p>카테고리를 List하는 기능</p>
     * @since 2023. 11. 28.
     * @return 모든 카테고리를 List에 담습니다.
     */
    public List<CategoryEntity> categoryView() {
        return adminRepository.categoryView();
    }



    /**
     * <p>카테고리 생성</p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto createCategory(CategoryDto categoryDto) {
        adminRepository.createCategory(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리 구분선 생성</p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto createCategoryLine(CategoryDto categoryDto) {
        adminRepository.createCategoryLine(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리 삭제. 카테고리를 삭제하면 해당 삭제한 카테고리의 {절대 경로 pos}보다 높은 모든 데이터의 {절대 경로 pos}값을 -1 합니다.</p>
     * @since 2023. 11. 29.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto deleteCategory(CategoryDto categoryDto) {
        adminRepository.deleteCategory(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리 수정</p>
     * @since 2023. 11. 30.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto updateCategory(CategoryDto categoryDto) {
        adminRepository.updateCategory(categoryDto);
        return categoryDto;
    }



    /**
     * <p>카테고리의 헤더를 List하는 기능</p>
     * @since 2023. 12. 04.
     * @return 카테고리의 헤더를 List에 담습니다.
     */
    public List<CategoryEntity> categoryHeader() {
        return adminRepository.categoryHeader();
    }

}

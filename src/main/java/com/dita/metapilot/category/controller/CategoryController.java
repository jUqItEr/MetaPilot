package com.dita.metapilot.category.controller;

import com.dita.metapilot.category.dto.CategoryDto;
import com.dita.metapilot.category.dto.CategoryPostDto;
import com.dita.metapilot.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * <p>Category Controller</p>
 *
 * @author Ha Seong Kim
 * @since 2023. 11. 30.
 * @version 1.0.0
 * */

@Controller
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;



    /**
     * <p>카테고리를 list하는 기능입니다.</p>
     *
     * @since 2023. 11. 30.
     *
     * @return ResponseEntity
     *      id : 카테고리의 id
     *      categoryTblRefId : 부모 카테고리의 id. 자식 카테고리가 아니라면 1 (왜냐하면 [전체 목록]의 id가 1이기 때문)
     *      subject : 카테고리의 이름
     *      depth : 부모 카테고리라면 0, 자식 카테고리라면 1 (구분선의 경우, 구분선이 [전체 목록]에 속하면 0, 구분선이 [특정 카테고리]의 자식이면 1)
     *      pos : 카테고리의 절대 경로. 무조건 이 순서대로 카테고리가 배치됨.
     *      type : 구분선이라면 0, 블로그형이라면 1, 이미지형이라면 2
     *      visible : 카테고리가 공개라면 0, 비공개라면 1
     *      fold : 카테고리가 펼쳐져 있으면 0, 접힌 상태면 1
     *      countVisible : 카테고리 속 게시글 수 공개라면 0, 비공개면 1
     *      listVisible :
     *      listCount :
     *      createdAt : 카테고리 작성일
     */
    @ResponseBody
    @GetMapping("/api/list")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(categoryService.categoryView());
    }

    @GetMapping("/category")
    public String listPage() {
        return "category/category.html";
    }



    /**
     * <p>특정 카테고리를 선택하면 해당 카테고리에 포함된 게시글들을 list 합니다. </p>
     *
     * @param categoryPostDto
     *      postCategoryId : 게시글에 저장된 카테고리의 id를 통해 특정 카테고리의 게시글을 찾는 기능
     *
     * @since 2023. 11. 30.
     * 
     * @return ResponseEntity
     *      id : 카테고리의 id
     *      cSubject : 카테고리 이름(제목)
     *      categoryTblRefId : 부모 카테고리의 id (자식 카테고리가 아니라면 1. 왜냐하면 [전체 목록]의 id가 1이기 때문)
     *      userTblId : 게시글 작성자의 id
     *      subject : 게시글 제목
     *      count : 게시글 조회수
     *      createdAt : 게시글 작성일
     */
    @ResponseBody
    @PostMapping("/api/listPost")
    public ResponseEntity<?> listPost(@Valid @RequestBody CategoryPostDto categoryPostDto, BindingResult bindingResult) {
        return ResponseEntity.ok(categoryService.categoryPostView(categoryPostDto));
    }



    /**
     * <p>카테고리 생성</p>
     *
     * @param categoryDto
     *      categoryTblRefId : 부모 카테고리의 id (자식 카테고리가 아니라면 1. 왜냐하면 [전체 목록]의 id가 1이기 때문)
     *      subject : 카테고리의 이름
     *      type : 구분선이라면 0, 블로그형이라면 1, 이미지형이라면 2
     *      visible : 카테고리가 공개라면 0, 비공개라면 1
     *      fold : 카테고리가 펼쳐져 있으면 0, 접힌 상태면 1
     *      countVisible : 카테고리 속 게시글 수 공개라면 0, 비공개면 1
     *      listVisible :
     *      listCount :
     *      createdAt : 카테고리 작성일
     *
     * @since 2023. 11. 29.
     */
    @ResponseBody
    @PostMapping("/api/createCategory")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }



    /**
     * <p>카테고리 구분선 생성</p>
     *
     * @param categoryDto
     *      categoryTblRefId : 부모 카테고리의 id (자식 카테고리가 아니라면 1. 왜냐하면 [전체 목록]의 id가 1이기 때문)
     *
     * @since 2023. 11. 29.
     */
    @ResponseBody
    @PostMapping("/api/createCategoryLine")
    public ResponseEntity<?> createCategoryLine(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(categoryService.createCategoryLine(categoryDto));
    }



    /**
     * <p>카테고리 삭제. 카테고리를 삭제하면 해당 삭제한 카테고리의 {절대 경로 pos}보다 높은 모든 데이터의 {절대 경로 pos}값을 -1 합니다.</p>
     * @since 2023. 11. 29.
     *
     * @param categoryDto
     *
     *      id : 카테고리의 id. 이 값과 일치하는 카테고리를 삭제.
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/api/deleteCategory")
    public ResponseEntity<?> deleteCategory(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(categoryService.deleteCategory(categoryDto));
    }



    /**
     * <p>카테고리 생성</p>
     *
     * @param categoryDto
     *      categoryTblRefId : 부모 카테고리의 id (자식 카테고리가 아니라면 1. 왜냐하면 [전체 목록]의 id가 1이기 때문)
     *      subject : 카테고리의 이름
     *      type : 구분선이라면 0, 블로그형이라면 1, 이미지형이라면 2
     *      visible : 카테고리가 공개라면 0, 비공개라면 1
     *      fold : 카테고리가 펼쳐져 있으면 0, 접힌 상태면 1
     *      countVisible : 카테고리 속 게시글 수 공개라면 0, 비공개면 1
     *      listVisible :
     *      listCount :
     *      createdAt : 카테고리 작성일
     *
     * @since 2023. 11. 30.
     */
    @ResponseBody
    @PostMapping("/api/updateCategory")
    public ResponseEntity<?> updateCategory(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryDto));
    }



    /**
     * <p>카테고리의 위치를 한 칸 올리는 기능 (사용할 지는 모르겠으나 일단 보류)</p>
     *
     * @since 2023. 12. 02.
     *
     * @param categoryDto
     *      pos : 카테고리의 절대경로
     *
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/api/updateCategoryUp")
    public ResponseEntity<?> updateCategoryUp(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(categoryService.updateCategoryUp(categoryDto));
    }



    /**
     * <p>카테고리의 위치를 한 칸 내리는 기능 (사용할 지는 모르겠으나 일단 보류)</p>
     *
     * @since 2023. 12. 02.
     *
     * @param categoryDto
     *      pos : 카테고리의 절대경로
     *
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/api/updateCategoryDown")
    public ResponseEntity<?> updateCategoryDown(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(categoryService.updateCategoryDown(categoryDto));
    }



    /**
     * <p>카테고리의 헤더를 list하는 기능입니다.</p>
     *
     * @since 2023. 12. 04.
     *
     * @return ResponseEntity
     */
    @ResponseBody
    @GetMapping("/api/categoryHeader")
    public ResponseEntity<?> categoryHeader() {
        return ResponseEntity.ok(categoryService.categoryHeader());
    }


}

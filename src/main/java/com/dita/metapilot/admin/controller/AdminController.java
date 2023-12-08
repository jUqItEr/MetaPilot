package com.dita.metapilot.admin.controller;

import com.dita.metapilot.admin.dto.*;
import com.dita.metapilot.admin.entity.CategoryEntity;
import com.dita.metapilot.admin.service.AdminService;
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
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    /**
     * <p>CategoryService를 불러옵니다.</p>
     */
    private final AdminService adminService;



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
    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(adminService.categoryView());
    }



    /**
     * <p>삭제된 게시글을 list하는 기능입니다.</p>
     *
     * @since 2023. 12. 07.
     *
     * @return ResponseEntity
     */
    @ResponseBody
    @PostMapping("/postDeletedList")
    public ResponseEntity<?> postDeletedView(PostDeletedDto postDeletedDto) {
        return ResponseEntity.ok(adminService.postDeletedView(postDeletedDto));
    }



    /**
     * <p>특정 id의 댓글을 list하는 기능입니다.</p>
     *
     * @since 2023. 12. 08.
     *
     * @return ResponseEntity
     */
    @ResponseBody
    @PostMapping("/commentList")
    public ResponseEntity<?> commentView(CommentDto commentDto) {
        return ResponseEntity.ok(adminService.commentView(commentDto));
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
    @PostMapping("/createCategory")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.createCategory(categoryDto));
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
    @PostMapping("/createCategoryLine")
    public ResponseEntity<?> createCategoryLine(@Valid @RequestBody CategoryUpDownDto categoryUpDownDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.createCategoryLine(categoryUpDownDto));
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
    @PostMapping("/deleteCategory")
    public ResponseEntity<?> deleteCategory(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.deleteCategory(categoryDto));
    }



    /**
     * <p>부모 카테고리와 해당 카테고리의 자식들까지 전부 삭제</p>
     * @since 2023. 12. 08.
     *
     * @param categoryDto
     */
    @ResponseBody
    @PostMapping("/deleteCategoryRef")
    public ResponseEntity<?> deleteCategoryRef(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.deleteCategoryRef(categoryDto));
    }



    /**
     * <p>게시글 삭제</p>
     * @since 2023. 12. 08.
     *
     * @param postDto
     *
     *      id : 카테고리의 id. 이 값과 일치하는 카테고리를 삭제.
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/deletePost")
    public ResponseEntity<?> deletePost(@Valid @RequestBody PostDto postDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.deletePost(postDto));
    }



    /**
     * <p>댓글 삭제</p>
     * @since 2023. 12. 08.
     *
     * @param commentDto
     *
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/deleteComment")
    public ResponseEntity<?> deleteComment(@Valid @RequestBody CommentDto commentDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.deleteComment(commentDto));
    }



    /**
     * <p>카테고리 수정</p>
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
    @PostMapping("/updateCategory")
    public ResponseEntity<?> updateCategory(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.updateCategory(categoryDto));
    }



    /**
     * <p>카테고리 한 칸 위로</p>
     *
     * @param categoryUpDownDto
     * @since 2023. 12. 07.
     */
    @ResponseBody
    @PostMapping("/updateCategoryUp")
    public ResponseEntity<?> updateCategoryUp(@Valid @RequestBody CategoryUpDownDto categoryUpDownDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.updateCategoryUp(categoryUpDownDto));
    }



    /**
     * <p>카테고리 한 칸 밑으로</p>
     *
     * @param categoryUpDownDto
     * @since 2023. 12. 07.
     */
    @ResponseBody
    @PostMapping("/updateCategoryDown")
    public ResponseEntity<?> updateCategoryDown(@Valid @RequestBody CategoryUpDownDto categoryUpDownDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.updateCategoryDown(categoryUpDownDto));
    }



    /**
     * <p>카테고리의 헤더를 list하는 기능입니다.</p>
     *
     * @since 2023. 12. 04.
     *
     * @return ResponseEntity
     */
    @ResponseBody
    @GetMapping("/categoryHeader")
    public ResponseEntity<?> categoryHeader() {
        return ResponseEntity.ok(adminService.categoryHeader());
    }


}

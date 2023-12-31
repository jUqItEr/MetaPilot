package com.dita.metapilot.admin.controller;

import com.dita.metapilot.admin.dto.*;
import com.dita.metapilot.admin.entity.CmsInfoEntity;
import com.dita.metapilot.admin.entity.HashtagEntity;
import com.dita.metapilot.admin.entity.UserRoleEntity;
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

    @ResponseBody
    @GetMapping("/readUserRole")
    public ResponseEntity<?> readUserRole(UserSearchRoleDto userSearchRoleDto){
        return ResponseEntity.ok(adminService.readUserRole(userSearchRoleDto));
    }
    @ResponseBody
    @PostMapping("/updateUserRole")
    public ResponseEntity<?> updateUserRole(UserRoleDto userRoleDto){
        return ResponseEntity.ok(adminService.updateUserRole(userRoleDto));
    }

    /**
     * <p>CategoryService를 불러옵니다.</p>
     */
    private final AdminService adminService;



    /**
     * <p>블로그 Info를 List하는 기능</p>
     *
     * @since 2023. 12. 11.
     *
     * @return BlogInfoDto
     */
    @ResponseBody
    @GetMapping("/getBlogInfo")
    public ResponseEntity<?> getBlogInfo() {
        return ResponseEntity.ok(adminService.getBlogInfo());
    }

    /**
     * <p>blog info tbl layout 수정</p>

     * @since 2023. 12. 12.
     */
    @ResponseBody
    @PostMapping("/updateLayout")
    public ResponseEntity<?> updateLayout(CmsInfoEntity cmsInfoEntity) {
        return ResponseEntity.ok(adminService.updateLayout(cmsInfoEntity));
    }

    @ResponseBody
    @GetMapping("/readTag")
    public ResponseEntity<?> readTag(HashtagSearchDto hashtagSearchDto) {
        System.out.println(hashtagSearchDto.getType());
        return ResponseEntity.ok(adminService.readTag(hashtagSearchDto));
    }

    @ResponseBody
    @GetMapping("/hasTag")
    public ResponseEntity<?> hasTag(HashtagDto hashtagDto) {
        return ResponseEntity.ok(adminService.isTagExist(hashtagDto));
    }

    @ResponseBody
    @PostMapping("/deleteTag")
    public ResponseEntity<?> deleteTag(HashtagDto hashtagDto) {
        return ResponseEntity.ok(adminService.deleteTag(hashtagDto));
    }

    @ResponseBody
    @PostMapping("/updateTag")
    public ResponseEntity<?> updateTag(HashtagEntity hashtagEntity) {
        return ResponseEntity.ok(adminService.updateTag(hashtagEntity));
    }


    /**
     * <p>blog info 수정</p>

     * @since 2023. 12. 12.
     */
    @ResponseBody
    @PostMapping("/updateBlogInfo")
    public ResponseEntity<?> updateBlogInfo(CmsInfoDto dto) {
        return ResponseEntity.ok(adminService.updateBlogInfo(dto));
    }



    /**
     * <p>read block user</p>
     * @since 2023. 12. 12.
     * @return 차단된 유저 아이디 정보를 List에 담습니다.
     */
    @ResponseBody
    @GetMapping("/readBlockUser")
    public ResponseEntity<?> readBlockUser() {
        return ResponseEntity.ok(adminService.readBlockUser());
    }



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
    @GetMapping("/category/list")
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
    @GetMapping("/post/deletedList")
    public ResponseEntity<?> postDeletedView(PostSearchDto postSearchDto) {
        return ResponseEntity.ok(adminService.postDeletedView(postSearchDto));
    }



    /**
     * <p>댓글을 list하는 기능입니다.</p>
     *
     * @since 2023. 12. 08.
     *
     * @return ResponseEntity
     */
    @ResponseBody
    @GetMapping("/comment/list")
    public ResponseEntity<?> commentView(CommentSearchDto commentSearchDto) {
        return ResponseEntity.ok(adminService.commentView(commentSearchDto));
    }



    /**
     * <p>검색한 댓글을 list하는 기능입니다.</p>
     *
     * @since 2023. 12. 13.
     *
     * @return ResponseEntity
     */
    @ResponseBody
    @GetMapping("/comment/searchList")
    public ResponseEntity<?> commentSearchView(CommentSearchDto commentSearchDto) {
        return ResponseEntity.ok(adminService.commentSearchView(commentSearchDto));
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
    @PostMapping("/category/create")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.createCategory(categoryDto));
    }



    /**
     * <p>카테고리 구분선 생성</p>
     *
     * @param categoryUpDownDto
     *      categoryTblRefId : 부모 카테고리의 id (자식 카테고리가 아니라면 1. 왜냐하면 [전체 목록]의 id가 1이기 때문)
     *
     * @since 2023. 11. 29.
     */
    @ResponseBody
    @PostMapping("/category/createLine")
    public ResponseEntity<?> createCategoryLine(@Valid @RequestBody CategoryUpDownDto categoryUpDownDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.createCategoryLine(categoryUpDownDto));
    }



    /**
     * <p>create block user</p>
     * @since 2023. 12. 12.
     * @return 사용자 차단.
     */
    @ResponseBody
    @PostMapping("/blockUser/create")
    public ResponseEntity<?> createBlockUser(UserDto dto) {
        return ResponseEntity.ok(adminService.createBlockUser(dto));
    }



    /**
     * <p>delete block user</p>
     * @since 2023. 12. 12.
     * @return 차단된 유저를 차단 해제 합니다.
     */
    @ResponseBody
    @PostMapping("/blockUser/delete")
    public ResponseEntity<?> deleteBlockUser(UserDto dto) {
        return ResponseEntity.ok(adminService.deleteBlockUser(dto));
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
    @PostMapping("/category/delete")
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
    @PostMapping("/category/deleteRef")
    public ResponseEntity<?> deleteCategoryRef(@Valid @RequestBody CategoryDto categoryDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.deleteCategoryRef(categoryDto));
    }



    /**
     * <p>게시글 임시로 삭제</p>
     * @since 2023. 12. 14.
     *
     * @param postDto
     *
     *      id : 카테고리의 id. 이 값과 일치하는 게시글의 deleted값을 1로 변경하여 임시로 삭제.
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/post/delete")
    public ResponseEntity<?> deletePost(@Valid @RequestBody PostDto postDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.deletePost(postDto));
    }



    /**
     * <p>임시로 삭제한 게시글 영구적으로 삭제</p>
     * @since 2023. 12. 14.
     *
     * @param postDto
     *
     *      id : 카테고리의 id. 이 값과 일치하는 게시글을 영구적으로 삭제.
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/post/deleteHard")
    public ResponseEntity<?> deletePostHard(@Valid @RequestBody PostDto postDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.deletePostHard(postDto));
    }



    /**
     * <p>임시로 삭제한 게시글 복구</p>
     * @since 2023. 12. 14.
     *
     * @param postDto
     *
     *      id : 카테고리의 id. 이 값과 일치하는 게시글을 영구적으로 삭제.
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    @ResponseBody
    @PostMapping("/post/restore")
    public ResponseEntity<?> restorePost(@Valid @RequestBody PostDto postDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.restorePost(postDto));
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
    @PostMapping("/comment/delete")
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
    @PostMapping("/category/update")
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
    @PostMapping("/category/updateUp")
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
    @PostMapping("/category/updateDown")
    public ResponseEntity<?> updateCategoryDown(@Valid @RequestBody CategoryUpDownDto categoryUpDownDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.updateCategoryDown(categoryUpDownDto));
    }



    /**
     * <p>카테고리 제일 위로</p>
     *
     * @param categoryUpDownDto
     * @since 2023. 12. 10.
     */
    @ResponseBody
    @PostMapping("/category/updateTop")
    public ResponseEntity<?> updateCategoryTop(@Valid @RequestBody CategoryUpDownDto categoryUpDownDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.updateCategoryTop(categoryUpDownDto));
    }



    /**
     * <p>카테고리 제일 아래로</p>
     *
     * @param categoryUpDownDto
     * @since 2023. 12. 10.
     */
    @ResponseBody
    @PostMapping("/category/updateBottom")
    public ResponseEntity<?> updateCategoryBottom(@Valid @RequestBody CategoryUpDownDto categoryUpDownDto, BindingResult bindingResult) {
        return ResponseEntity.ok(adminService.updateCategoryBottom(categoryUpDownDto));
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

package com.dita.metapilot.admin.service;

import com.dita.metapilot.admin.dto.*;
import com.dita.metapilot.admin.entity.*;
import com.dita.metapilot.admin.repository.AdminRepository;
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
     * <p>블로그 Info를 List하는 기능</p>
     * @since 2023. 12. 11.
     * @return 모든 정보를 List에 담습니다.
     */
    public List<CmsInfoEntity>  getBlogInfo(){return adminRepository.getCmsInfo();}

    /**
     * <p>blog info 수정</p>
     * @since 2023. 12. 12.
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public boolean updateLayout(CmsInfoEntity cmsInfoEntity) {
        return adminRepository.updateLayout(cmsInfoEntity);
    }

    public List<HashtagEntity> readTag(HashtagSearchDto hashtagSearchDto){
        return adminRepository.readTag(hashtagSearchDto);
    }

    public boolean isTagExist(HashtagDto hashtagDto) {
        return adminRepository.isTagExist(hashtagDto);
    }

    public boolean deleteTag(HashtagDto hashtagDto) {
        return adminRepository.deleteTag(hashtagDto);
    }

    public boolean updateTag(HashtagEntity hashtagEntity) {
        return adminRepository.updateTag(hashtagEntity);
    }


    /**
     * <p>blog info 수정</p>
     * @since 2023. 12. 12.
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CmsInfoDto updateBlogInfo(CmsInfoDto dto) {
        adminRepository.updateBlogInfo(dto);
        return dto;
    }



    /**
     * <p>create block user</p>
     * @since 2023. 12. 12.
     * @return 유저 차단
     */
    public boolean createBlockUser(UserDto dto) {
        boolean result = false;

        try {
            result = adminRepository.createBlockUser(dto);
        } catch (Exception e) {

        }
        return result;
    }



    /**
     * 카테고리 Repository를 불러옵니다.
     */
    private final AdminRepository adminRepository;




    /**
     * <p>read block user</p>
     * @since 2023. 12. 12.
     * @return 차단된 유저 아이디 정보를 List에 담습니다.
     */
    public List<UserDto> readBlockUser() {
        return adminRepository.readBlockUser();
    }




    /**
     * <p>카테고리를 List하는 기능</p>
     * @since 2023. 11. 28.
     * @return 모든 카테고리를 List에 담습니다.
     */
    public List<CategoryEntity> categoryView() {
        return adminRepository.categoryView();
    }




    /**
     * <p>삭제된 게시글을 List하는 기능</p>
     * @since 2023. 11. 28.
     * @return 삭제된 게시글을 List에 담습니다.
     */
    public List<PostEntity> postDeletedView(PostDeletedDto postDeletedDto) {
        return adminRepository.postDeletedView(postDeletedDto);
    }




    /**
     * <p>댓글을 List하는 기능</p>
     * @since 2023. 11. 28.
     * @return 특정 id의 댓글을 List에 담습니다.
     */
    public List<CommentEntity> commentView(CommentDto commentDto) {
        return adminRepository.commentView(commentDto);
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
     * @param categoryUpDownDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryUpDownDto createCategoryLine(CategoryUpDownDto categoryUpDownDto) {
        adminRepository.createCategoryLine(categoryUpDownDto);
        return categoryUpDownDto;
    }



    /**
     * <p>delete block user</p>
     * @since 2023. 12. 12.
     * @return 유저 차단을 취소시킵니다. (차단해제)
     */
    public boolean deleteBlockUser(UserDto dto) {
        return adminRepository.deleteBlockUser(dto);
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
     * <p>부모 카테고리와 해당 카테고리의 자식들까지 전부 삭제</p>
     * @since 2023. 12. 08.
     * @param categoryDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryDto deleteCategoryRef(CategoryDto categoryDto) {
        adminRepository.deleteCategoryRef(categoryDto);
        return categoryDto;
    }



    /**
     * <p>게시글 삭제</p>
     * @since 2023. 12. 08.
     * @param postDto 게시글 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public PostDto deletePost(PostDto postDto) {
        adminRepository.deletePost(postDto);
        return postDto;
    }



    /**
     * <p>댓글 삭제</p>
     * @since 2023. 12. 08.
     * @param commentDto 댓글 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CommentDto deleteComment(CommentDto commentDto) {
        adminRepository.deleteComment(commentDto);
        return commentDto;
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
     * <p>카테고리 한 칸 위로</p>
     * @since 2023. 12. 07.
     * @param categoryUpDownDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryUpDownDto updateCategoryUp(CategoryUpDownDto categoryUpDownDto) {
        adminRepository.updateCategoryUp(categoryUpDownDto);
        return categoryUpDownDto;
    }



    /**
     * <p>카테고리 한 칸 밑으로</p>
     * @since 2023. 12. 07.
     * @param categoryUpDownDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryUpDownDto updateCategoryDown(CategoryUpDownDto categoryUpDownDto) {
        adminRepository.updateCategoryDown(categoryUpDownDto);
        return categoryUpDownDto;
    }



    /**
     * <p>카테고리 제일 위로</p>
     * @since 2023. 12. 10.
     * @param categoryUpDownDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryUpDownDto updateCategoryTop(CategoryUpDownDto categoryUpDownDto) {
        adminRepository.updateCategoryTop(categoryUpDownDto);
        return categoryUpDownDto;
    }



    /**
     * <p>카테고리 제일 아래로</p>
     * @since 2023. 12. 10.
     * @param categoryUpDownDto 카테고리 데이터를 전송하는 객체
     * @return 성공적으로 완료되면 true, 그렇지 않으면 false를 반환합니다.
     */
    public CategoryUpDownDto updateCategoryBottom(CategoryUpDownDto categoryUpDownDto) {
        adminRepository.updateCategoryBottom(categoryUpDownDto);
        return categoryUpDownDto;
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

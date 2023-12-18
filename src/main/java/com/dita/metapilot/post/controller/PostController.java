package com.dita.metapilot.post.controller;

import com.dita.metapilot.post.dto.*;
import com.dita.metapilot.post.entity.CategoryPostEntity;
import com.dita.metapilot.post.entity.PostEntity;
import com.dita.metapilot.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


/**
 * <p>게시글 조회 및 작성추가</p>
 *
 * @author 곽성원 (@SungwonGwak)
 * @since 2023. 11. 28.
 * @version 1.0.0
 * */

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;

    /**
     * <p>게시글을 작성하고 성공 여부를 반환하는 컨트롤러 메서드</p>
     *
     * @param postDto 게시글 번호를 담은 DTO.
     * @return 게시글 작성 성공 시 postIdDto return, 실패 시 false를 반환
     * @since 2023. 11. 28.
     */
    @ResponseBody
    @PostMapping("/create")
    public ResponseEntity<Boolean> createPost(PostDto postDto) {
        return ResponseEntity.ok(postService.createPost(postDto));
    }

    /**
     * <p>게시글을 삭제하고 성공 여부를 반환하는 컨트롤러 메서드</p>
     *
     * @param postIdDto 게시글 번호를 담은 DTO.
     * @return 게시글 삭제 성공 시 true, 실패 시 false를 반환
     * @since 2023. 11. 28.
     */
    @ResponseBody
    @PostMapping("/delete")
    public ResponseEntity<Boolean> deletePost(PostIdDto postIdDto) {
        return ResponseEntity.ok(postService.deletePost(postIdDto));
    }

    /**
     * <p>여러게시글들을 삭제하고 성공 여부를 반환하는 컨트롤러 메서드</p>
     *
     * @param postIdsDto 여러 게시글 번호들을 담은 DTO.
     * @return 게시글 삭제 성공 시 true, 실패 시 false를 반환
     * @since
     */
    @ResponseBody
    @PostMapping("/delete-multiple")
    public ResponseEntity<Boolean> deletePosts(@RequestBody PostIdsDto postIdsDto) {
        boolean result = postService.deletePosts(postIdsDto);
        return ResponseEntity.ok(result);
    }

    /**
     * <p>해시태그로 게시글을 검색하고 성공 여부를 반환하는 컨트롤러 메서드</p>
     *
     * @param hashtags 입력한 해시태그.
     * @return 검색된 게시글 리스트를 반환
     * @since 2023. 12. 03.
     */
    @ResponseBody
    @PostMapping("/hashtag/search")
    public List<PostDto> findPostByHashtag(@RequestBody List<String> hashtags) {
        return postService.findPostByHashtag(hashtags);
    }

    /**
     * <p>게시글에 좋아요 누른 유저 목록을 가져오는 컨트롤러 메서드</p>
     *
     * @param
     * @return
     * @since
     */
    @ResponseBody
    @GetMapping("/response/list")
    public List<PostLikesDto> getLikesList(PostIdDto postIdDto) {
        return postService.getLikesList(postIdDto);
    }

    /**
     * <p>공지사항 게시글 리스트를 반환하는 컨트롤러 메서드</p>
     *
     * @return 공지사항 게시글 리스트를 반환
     * @since 2023. 12. 05.
     */
    @ResponseBody
    @GetMapping("/notice")
    public List<PostEntity> getNoticePosts() {
        return postService.getNotciePosts();
    }

    /**
     * <p>게시글 리스트 페이지의 게시글 개수를 조회하는 컨트롤러 메서드</p>
     *
     * @return
     * @since
     */
    @ResponseBody
    @GetMapping("/count")
    public ResponseEntity<?> getPostCount(PagingDto pagingDto) {
        return ResponseEntity.ok(postService.getPostCount(pagingDto));
    }

    /**
     * <p>인기 게시글 리스트를 반환하는 컨트롤러 메서드</p>
     *
     * @return 인기 게시글 리스트를 반환
     * @since 2023. 12. 05.
     */
    @ResponseBody
    @GetMapping("/popular")
    public List<PostPopularDto> getPopularPosts() {
        return postService.getPopularPosts();
    }

    /**
     * <p>게시글 좋아요 상태 확인 컨트롤러 메서드</p>
     *
     * @param postResponseDto 게시글 번호와 사용자의 ID를 담은 DTO.
     * @return 좋아요가 있을시 true, 없을시 false 반환
     * @since 2023. 12. 01.
     */
    @ResponseBody
    @PostMapping("/response/exist")
    public ResponseEntity<Boolean> hasLike(PostResponseDto postResponseDto) {
        return ResponseEntity.ok(postService.haslike(postResponseDto));
    }

    /**
     * <p>게시글을 수정하고 성공 여부를 반환하는 컨트롤러 메서드</p>
     *
     * @param postDto 게시글 수정에 필요한 정보를 담은 DTO.
     * @return 게시글 수정 결과를 반환.
     * @since 2023. 11. 28.
     */
    @ResponseBody
    @PostMapping("/update")
    public ResponseEntity<Boolean> updatePost(@RequestPart(required = false) PostDto postDto,
                                              @RequestPart(required = false) List<String> tags,
                                              @RequestPart(required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(postService.updatePost(postDto, tags, files));
    }

    /**
     * <p>게시글에 대한 좋아요 상태를 업데이트하는 컨트롤러 메서드</p>
     *
     * @param postResponseDto 게시글 번호와 사용자의 ID를 담은 DTO.
     * @return 게시글 좋아요 상태 업데이트 결과를 반환.
     * @since 2023. 11. 29.
     */
    @ResponseBody
    @PostMapping("/response/update")
    public ResponseEntity<Boolean> updateLike(PostResponseDto postResponseDto) {
        return ResponseEntity.ok(postService.updateLike(postResponseDto));
    }

    /**
     * <p>게시글을 조회하고, 조회된 게시글 정보를 반환하는 컨트롤러.</p>
     *
     * @param postIdDto 게시글 번호 담긴 DTO.
     * @return 조회된 게시글 정보를 반환
     * @since 2023. 11. 28.
     */
    @ResponseBody
    @GetMapping("/view")
    public ResponseEntity<PostViewDto> postView(PostIdDto postIdDto) {
        System.out.println(postIdDto.getPostId());
        return ResponseEntity.ok(postService.getPostView(postIdDto));
    }

    /**
     * <p>게시글 리스트 페이지를 조회하는 컨트롤러 메서드</p>
     *
     * @param pagingDto 페이징 정보가 담긴 DTO.
     * @return 조회된 게시글 리스트를 반환
     * @since
     */
    @ResponseBody
    @GetMapping("/page")
    public ResponseEntity<List<PostEntity>> postPageView(PagingDto pagingDto) {
        return ResponseEntity.ok(postService.getPostPageView(pagingDto));
    }

    /*
    @ResponseBody
    @PostMapping("/getPost")
    public ResponseEntity<?> getPost(PostIdDto postIdDto) {
        System.out.println(postIdDto.getPostId());
        return ResponseEntity.ok(postService.getPost(postIdDto));
    }
    */

    /**
     * <p>인기 게시글 리스트를 반환하는 컨트롤러 메서드</p>
     *
     * @return 인기 게시글 리스트를 반환
     * @since 2023. 12. 05.
     */
    @ResponseBody
    @GetMapping("/categoryDataList")
    public List<CategoryPostEntity> categoryDataList(PostSearchDto postSearchDto) {
        return postService.categoryDataList(postSearchDto);
    }
}

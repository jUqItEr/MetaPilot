package com.dita.metapilot.post.controller;

import com.dita.metapilot.post.dto.*;
import com.dita.metapilot.post.entity.PostEntity;
import com.dita.metapilot.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.BreakIterator;
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
     * @param postDto 게시글 작성에 필요한 정보를 담은 DTO.
     * @param tags 게시글에 추가될 해시태그 리스트
     * @return 게시글 작성 성공 시 true, 실패 시 false를 반환
     * @since 2023. 11. 28.
     */
    @ResponseBody
    @PostMapping("/create")
    public ResponseEntity<Boolean> createPost(@RequestPart PostDto postDto,
                                              @RequestPart(required = false) List<String> tags,
                                              @RequestPart(required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(postService.createPost(postDto, tags, files));
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
     * <p>해시태그로 게시글을 검색하고 성공 여부를 반환하는 컨트롤러 메서드</p>
     *
     * @param hashtags 입력한 해시태그.
     * @return 검색된 게시글 리스트를 반환
     * @since 2023. 12. 03.
     */
    @ResponseBody
    @PostMapping("/hashtag/find")
    public List<PostDto> findPostByHashtag(@RequestBody List<String> hashtags) {
        return postService.findPostByHashtag(hashtags);
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
     * <p>인기 게시글 리스트를 반환하는 컨트롤러 메서드</p>
     *
     * @return 인기 게시글 리스트를 반환
     * @since 2023. 12. 05.
     */
    @ResponseBody
    @GetMapping("/popular")
    public List<PostEntity> getPopularPosts() {
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
    @PostMapping("/hasLike")
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
    public ResponseEntity<Boolean> updatePost(@RequestPart PostDto postDto,
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
    @PostMapping("/updatelike")
    public ResponseEntity<Boolean> updateLike(PostResponseDto postResponseDto) {
        return ResponseEntity.ok(postService.updateLike(postResponseDto));
    }

    /**
     * <p>게시글을 조회하고, 조회된 게시글 정보를 반환하는 컨트롤러.</p>
     *
     * @param postId 게시글 번호.
     * @return 조회된 게시글 정보를 반환
     * @since 2023. 11. 28.
     */
    @ResponseBody
    @GetMapping("/postView/{postId}")
    public ResponseEntity<PostViewDto> postView(@PathVariable int postId) {
        PostIdDto postIdDto = new PostIdDto();

        postIdDto.setPostId(postId);
        return ResponseEntity.ok(postService.getPostView(postIdDto));
    }
}

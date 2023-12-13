package com.dita.metapilot.comment.controller;

import com.dita.metapilot.comment.dto.*;
import com.dita.metapilot.comment.entity.CommentEntity;
import com.dita.metapilot.comment.repository.CommentRepository;
import com.dita.metapilot.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

/*
 * CommentController는 댓글과 관련된 HTTP 요청을 처리합니다.
 * 댓글 추가, 수정, 삭제 그리고 댓글 목록 조회 기능을 제공합니다.
 *
 * @param CommentDto       댓글 추가, 수정, 삭제를 위한 정보를 담은 객체
 * @param CommentListDto   댓글 목록 조회를 위한 정보를 담은 객체
 * @param CommentEntity    댓글 데이터를 담은 객체
 * @param RegisterDto      회원가입 요청 정보를 담은 객체
 * @param LikeDto          좋아요 정보를 담은 객체
 * @author Seung yun Lee (@Seungyun)
 * @since 2023. 12. 11.
 * @version 1.0.0
 */
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;
    private final CommentRepository commentRepository;


    /*
     * 새로운 댓글 등록
     *
     * @param commentDto     등록할 댓글의 정보를 포함한 DTO
     * @param file           옵션: 업로드할 파일
     * @param bindingResult  요청 데이터의 검증 결과를 담은 객체
     * @return               ResponseEntity 객체를 반환하여 댓글 등록 여부 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @PostMapping("/registerComment")
    public ResponseEntity<?> registerComment(@RequestPart CommentDto commentDto, @RequestPart(required = false) MultipartFile file, BindingResult bindingResult) {
        return ResponseEntity.ok(commentService.saveComment(commentDto, file)); // 댓글 저장 후 결과 반환
    }

    /*
     * 댓글 업데이트
     *
     * @param commentDto 업데이트할 댓글의 정보를 포함한 DTO
     * @return           ResponseEntity 객체를 반환하여 댓글 업데이트 여부 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @PostMapping("/updateComment")
    public ResponseEntity<?> updateComment(@RequestBody CommentDto commentDto) {
        CommentDto updatedComment = commentService.updateCommentDto(commentDto); // 댓글 업데이트
        if (updatedComment != null) {
            return ResponseEntity.ok().build(); // 업데이트 성공
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 업데이트 실패
        }
    }

    /*
     * 댓글 삭제
     * @param id            삭제할 댓글의 ID
     * @param commentDto    삭제할 댓글의 정보를 포함한 DTO
     * @param bindingResult 요청 데이터의 검증 결과를 담은 객체
     * @return ResponseEntity 객체를 반환하여 댓글 삭제 여부 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @PostMapping("/deleteComment")
    public ResponseEntity<?> deleteComment(@RequestBody CommentIdDto commentIdDto) {
        boolean isDeleted = commentService.deleteComment(commentIdDto);

        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*
     * 댓글 목록 조회
     *
     * @return List<CommentEntity> 형태로 댓글 목록을 반환합니다.
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @GetMapping("/comments")
    public List<CommentEntity> commentsByPostId(PostIdDto postIdDto) {
        Long postId = postIdDto.getPostId(); // postIdDto에서 postId 가져오기
        return commentService.listCommentsByPostId(postIdDto); // 특정 postId에 해당하는 댓글 목록 반환
    }


    /**
     * 댓글을 생성합니다.
     * @return                 ResponseEntity 객체를 반환하여 댓글 생성 여부 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @PostMapping("/createComment")
    public ResponseEntity<String> createComment(@RequestBody RefCommentDto refCommentDto) {
        try {
            commentService.createComment(refCommentDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Comment created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create comment");
        }
    }

    /*
     * 좋아요 정보를 업데이트하는 메서드
     *
     * @param likeDto 좋아요 DTO
     * @return 업데이트 성공 여부에 따른 ResponseEntity 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @PostMapping("/likes/update")
    public ResponseEntity<String> updateLike(@RequestBody LikeDto likeDto) {
        boolean result = commentService.updateLike(likeDto);

        if (result) {
            return ResponseEntity.ok("Successfully updated like status");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update like status");
        }
    }

    /*
     * 해당 댓글에 대한 사용자의 좋아요 여부를 확인하는 메서드
     *
     * @param commentId 댓글 ID
     * @param userId    사용자 ID
     * @return 사용자의 좋아요 여부에 따른 ResponseEntity 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @GetMapping("/likes/haslike")
    public ResponseEntity<Boolean> hasLike(@ModelAttribute LikeDto likeDto) {
        long id = likeDto.getComment_tbl_id();
        String userId = likeDto.getUser_tbl_id();
        boolean hasLike = commentService.hasLike(likeDto); // likeDto를 전달합니다.
        return ResponseEntity.ok(hasLike);
    }




}

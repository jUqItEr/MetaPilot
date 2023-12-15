package com.dita.metapilot.comment.controller;

import com.dita.metapilot.comment.dto.*;
import com.dita.metapilot.comment.entity.CommentEntity;
import com.dita.metapilot.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>댓글과 관련된 요청을 처리하는 컨트롤러</p>
 *
 * @since   2023. 12. 11.
 * @author  Kiseok Kang (@jUqItEr)
 * @author  Seungyun Lee (@Seungyun6857)
 * @version 2.1.3
 */
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService service;

    /**
     * <p>댓글 / 답글 / 대댓글을 생성하는 메서드</p>
     *
     * @param  dto 댓글 / 답글 / 대댓글 기능이 통합된 데이터 전송용 객체
     * @return 댓글의 생성 여부를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    @ResponseBody
    @PostMapping("/create")
    public ResponseEntity<?> createComment(RefDto dto) {
        return ResponseEntity.ok(service.createComment(dto));
    }

    /**
     * <p>댓글 / 답글 / 대댓글을 삭제하는 메서드</p>
     *
     * @param  dto 댓글의 고유값, 댓글 표시 유무, 댓글 내용이 포함된 데이터 전송용 객체
     * @return 댓글의 삭제 여부를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    @ResponseBody
    @PostMapping("/delete")
    public ResponseEntity<?> deleteComment(CommentDto dto) {
        return ResponseEntity.ok(service.deleteComment(dto));
    }

    /**
     * <p>댓글의 개수를 불러오는 메서드</p>
     *
     * @param  dto 게시글 고유값, 표시 권한이 포함된 데이터 전송용 객체
     * @return 게시글의 댓글 개수를 반환
     * @since  2023. 12. 15.
     * @author Kiseok Kang (@Seungyun)
     */
    @ResponseBody
    @GetMapping("/count")
    public ResponseEntity<?> getCommentCount(PostRequestDto dto) {
        return ResponseEntity.ok(service.getCommentCount(dto));
    }

    /**
     * <p>게시글의 댓글 목록을 불러오는 메서드</p>
     *
     * @param  dto 게시글 고유값, 표시 권한이 포함된 데이터 전송용 객체
     * @return 게시글의 댓글 목록을 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    @ResponseBody
    @GetMapping("/list")
    public List<CommentEntity> getCommentList(PostRequestDto dto) {
        return service.getCommentList(dto);
    }

    /**
     * <p>댓글 / 답글 / 대댓글을 수정하는 메서드</p>
     *
     * @param  dto 댓글의 고유값, 댓글 표시 유무, 댓글 내용이 포함된 데이터 전송용 객체
     * @return 댓글을 수정한 결과를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    @ResponseBody
    @PostMapping("/update")
    public ResponseEntity<?> updateComment(CommentDto dto) {
        return ResponseEntity.ok(service.updateCommentDto(dto));
    }

    // ---------------- LikeController 통합

    /**
     * <p>해당 댓글에 대한 사용자의 좋아요 여부를 확인하는 메서드</p>
     *
     * @param dto 사용자의 고유값, 댓글의 고유값이 포함된 데이터 전송용 객체
     * @return 사용자가 댓글에 호응한 여부를 반환
     * @since 2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    @ResponseBody
    @GetMapping("/response/exist")
    public ResponseEntity<Boolean> hasResponse(@ModelAttribute ResponseDto dto) {
        return ResponseEntity.ok(service.hasResponse(dto));
    }

    /**
     * <p>좋아요 상태를 변경하는 메서드</p>
     *
     * @param  dto 사용자의 고유값, 댓글의 고유값이 포함된 데이터 전송용 객체
     * @return 사용자가 댓글의 호응 상태를 변경한 결과를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    @ResponseBody
    @PostMapping("/response/update")
    public ResponseEntity<?> updateResponse(ResponseDto dto) {
        return ResponseEntity.ok(service.updateResponse(dto));
    }
}

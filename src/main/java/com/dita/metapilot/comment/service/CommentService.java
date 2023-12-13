package com.dita.metapilot.comment.service;

import com.dita.metapilot.comment.dto.CommentDto;
import com.dita.metapilot.comment.dto.LikeDto;
import com.dita.metapilot.comment.dto.PostCommentDto;
import com.dita.metapilot.comment.dto.RefCommentDto;
import com.dita.metapilot.comment.entity.CommentEntity;
import com.dita.metapilot.comment.repository.CommentRepository;
import com.dita.metapilot.comment.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;



/*
 * <p>댓글 서비스 클래스입니다.</p>
 * <p>CommentRepository를 사용하여 댓글 관련 비즈니스 로직을 처리</p>
 * @author Seung yun Lee (@Seungyun)
 * @since 2023. 12. 11.
 * @version 1.0.0
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {


    private final CommentRepository commentRepository;
    private FileService fileService;

    @Autowired
    public CommentService(CommentRepository commentRepository, FileService fileService) {
        this.commentRepository = commentRepository;
        this.fileService = fileService;
    }

    /*
     * 댓글을 저장하는 메서드
     *
     * @param commentDto 저장할 댓글 정보
     * @return 저장 성공 여부
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public boolean saveComment(CommentDto commentDto){
        boolean result = false;

        result = commentRepository.saveComment(commentDto);
        int commentId = commentRepository.getRecentCommentId();
        MultipartFile file = null;
        if (file != null) {
            result &= fileService.createFile(commentId, file);
        }

        return result;
    }

    /*
     * 댓글을 업데이트하는 메서드
     *
     * @param commentDto 업데이트할 댓글 정보
     * @return 업데이트된 댓글 정보
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public CommentDto updateCommentDto (CommentDto commentDto){
        commentRepository.updateComment(commentDto);
        return commentDto;
    }

    /*
     * 댓글을 삭제하는 메서드
     *
     * @param commentDto 삭제할 댓글 정보
     * @return 삭제된 댓글 정보
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public boolean deleteComment(CommentDto commentDto) {
        try {
            // CommentDto에서 ID를 가져와서 사용
            long commentId = commentDto.getId();
            // 주어진 ID를 사용하여 댓글을 삭제하는 데이터베이스 조작 메서드 호출
            return commentRepository.deleteComment(commentId) > 0;
        } catch (Exception e) {
            // 예외 발생 시 로깅하고 삭제 실패로 처리
            System.err.println("댓글 삭제 중 예외 발생: " + e.getMessage());
            return false;
        }
    }


    /*
     * 댓글 목록을 조회하는 메서드
     *
     * @return 댓글 목록 (CommentEntity 리스트 형태)
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */

    public List<CommentEntity> listCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }



    /*
     * 댓글을 ID를 이용해 삭제하는 메서드
     *
     * @param id 삭제할 댓글 ID
     * @return 삭제 성공 여부
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public boolean deleteCommentById(long id) {
        try {
            // 주어진 ID를 사용하여 댓글을 삭제하는 데이터베이스 조작 메서드 호출
            return commentRepository.deleteComment(id) > 0;
        } catch (Exception e) {
            // 예외 발생 시 로깅하고 삭제 실패로 처리
            System.err.println("댓글 삭제 중 예외 발생: " + e.getMessage());
            return false;
        }
    }

    /*
     * 댓글을 저장하고 파일을 첨부하는 메서드
     *
     * @param commentDto 댓글 정보
     * @param file       첨부할 파일
     * @return 저장 및 파일 첨부 성공 여부
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public boolean saveComment(CommentDto commentDto, MultipartFile file) {
        boolean result = false;

        // 댓글 저장
        result = commentRepository.saveComment(commentDto);

        // 저장된 댓글의 ID 가져오기
        int commentId = commentRepository.getRecentCommentId();

        // 파일 서비스를 사용하여 파일 저장
        if (file != null && !file.isEmpty()) {
            result &= fileService.createFile(commentId, file);
        }
        return result;
    }



    /*
     * PostCommentDto를 사용하여 댓글을 생성하는 메서드
     *
     * @param postCommentDto 생성할 댓글 정보를 담은 객체
     * @return 생성된 댓글 정보를 담은 객체(PostCommentDto)
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public PostCommentDto createComment(PostCommentDto postCommentDto) {
        commentRepository.addComment(postCommentDto);
        commentRepository.updateCommentReference(postCommentDto);
        return postCommentDto;
    }
    
    
    /*
     * RefCommentDto를 사용하여 댓글에 답글을 생성하는 메서드
     *
     * @param refCommentDto 생성할 댓글 정보를 담은 객체
     * @return 생성된 댓글 정보를 담은 객체(RefCommentDto)
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public RefCommentDto createComment(RefCommentDto refCommentDto) {
        commentRepository.createComment(refCommentDto);
        return refCommentDto;
    }

    /*
     * 댓글의 좋아요 여부를 확인하는 메서드
     *
     * @param likeDto 댓글 좋아요 정보를 담은 DTO
     * @return 해당 댓글에 대해 사용자가 좋아요를 눌렀는지 여부를 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public boolean hasLike(LikeDto likeDto) {
        return commentRepository.hasLike(likeDto);
    }

    /*
     * 댓글의 좋아요를 추가 또는 취소하는 메서드
     *
     * @param likeDto 댓글 좋아요 정보를 담은 DTO
     * @return 댓글에 성공적으로 좋아요를 추가하거나 취소했을 때 true 반환
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public boolean updateLike(LikeDto likeDto) {
        boolean hasLike = commentRepository.hasLike(likeDto);

        if (hasLike) {
            return commentRepository.revokeLike(likeDto);
        } else {
            return commentRepository.createLike(likeDto);
        }
    }
}
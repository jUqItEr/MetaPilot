package com.dita.metapilot.comment.repository;

import com.dita.metapilot.comment.dto.CommentDto;
import com.dita.metapilot.comment.dto.PostCommentDto;
import com.dita.metapilot.comment.dto.RefCommentDto;
import com.dita.metapilot.comment.entity.CommentEntity;
import com.dita.metapilot.comment.dto.LikeDto;
import org.apache.ibatis.annotations.Mapper;


import java.util.List;


/**
 * <p>댓글 관련 데이터베이스 접근을 위한 Repository 인터페이스 </p>
 *
 * @param saveComment    댓글을 저장하는 메서드
 * @param updateComment  댓글을 업데이트하는 메서드
 * @param deleteComment  댓글을 삭제하는 메서드
 * @param listComments   댓글 목록을 조회하는 메서드
 * @author Seung yun Lee (@Seungyun)
 * @since 2023. 11. 28.
 * @version 1.0.0
 */

@Mapper
public interface CommentRepository {
    boolean saveComment(CommentDto commentDto);
    long updateComment(CommentDto commentDto);
    long deleteComment(long commentId);
    List<CommentEntity> findByPostId(Long postId);
    int getRecentCommentId();

    default void deleteById(long id) {
        try {
            String query = "DELETE FROM comment_tbl WHERE id = ?";
        } catch (Exception e) {
            System.err.println("댓글 삭제 중 예외 발생: " + e.getMessage());
        }
    }
    // 댓글 추가
    boolean addComment(PostCommentDto postCommentDto);

    boolean updateCommentReference(PostCommentDto postCommentDto);

    boolean createComment(RefCommentDto refCommentDto);
    // 댓글 조회


    /*
     * 댓글에 좋아요 추가
     *
     * @param likeDto 좋아요 DTO
     * @return 좋아요 추가 성공 여부
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    boolean createLike(LikeDto likeDto);

    /*
     * 댓글에 좋아요 취소
     *
     * @param likeDto 좋아요 DTO
     * @return 좋아요 취소 성공 여부
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    boolean revokeLike(LikeDto likeDto);

    /*
     * 특정 댓글에 대한 사용자의 좋아요 여부 확인
     *
     * @param likeDto 좋아요 DTO
     * @return 좋아요 여부 확인 결과
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    boolean hasLike(LikeDto likeDto);
}

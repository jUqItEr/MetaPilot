package com.dita.metapilot.comment.service;

import com.dita.metapilot.comment.dto.*;
import com.dita.metapilot.comment.entity.CommentEntity;
import com.dita.metapilot.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>댓글과 관련된 요청을 처리하는 서비스</p>
 *
 * @since   2023. 12. 11.
 * @author  Kiseok Kang (@jUqItEr)
 * @author  Seungyun Lee (@Seungyun6857)
 * @version 2.1.0
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository repository;

    /**
     * <p>댓글 / 답글 / 대댓글을 생성하는 메서드</p>
     *
     * @param  dto 댓글 / 답글 / 대댓글 기능이 통합된 데이터 전송용 객체
     * @return 댓글의 생성 여부를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    public boolean createComment(RefDto dto) {
        // 만약 답글이나 대댓글이 아닐 경우, 자기 자신을 루트로 삼아야 함.
        boolean result = repository.createComment(dto);

        if (dto.getRootId() == 0) {
            dto.setId(repository.getLastId());
            result &= repository.updateRootId(dto);
        }
        return result;
    }

    /**
     * <p>댓글 / 답글 / 대댓글을 삭제하는 메서드</p>
     *
     * @param  dto 댓글의 고유값, 댓글 표시 유무, 댓글 내용이 포함된 데이터 전송용 객체
     * @return 댓글의 삭제 여부를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    public boolean deleteComment(CommentDto dto) {
        boolean result = false;

        try {
            if (repository.hasSibling(dto)) {
                result = repository.deleteResponses(dto);
                result &= repository.updateRootComment(dto);
            } else {
                long id = dto.getId();
                long rootId = repository.getRootId(dto);
                dto.setId(rootId);

                if (!repository.hasSibling(dto)) {
                    result = repository.deleteComment(dto);
                }
                dto.setId(id);
                result = repository.deleteComment(dto);
            }
        } catch (Exception e) {
            // 예외 발생 시 로깅하고 삭제 실패로 처리
            System.err.println("댓글 삭제 중 예외 발생: " + e.getMessage());
        }
        return result;
    }

    /**
     * <p>댓글의 개수를 불러오는 메서드</p>
     *
     * @param  dto 게시글 고유값, 표시 권한이 포함된 데이터 전송용 객체
     * @return 게시글의 댓글 개수를 반환
     * @since  2023. 12. 15.
     * @author Kiseok Kang (@Seungyun)
     */
    public long getCommentCount(PostRequestDto dto) {
        return repository.getTotalCount(dto);
    }

    /**
     * <p>게시글의 댓글 목록을 불러오는 메서드</p>
     *
     * @param  dto 게시글 고유값, 표시 권한이 포함된 데이터 전송용 객체
     * @return 게시글의 댓글 목록을 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    public List<CommentEntity> getCommentList(PostRequestDto dto) {
        return repository.getCommentList(dto);
    }

    /**
     * <p>댓글 / 답글 / 대댓글을 수정하는 메서드</p>
     *
     * @param  dto 댓글의 고유값, 댓글 표시 유무, 댓글 내용이 포함된 데이터 전송용 객체
     * @return 댓글을 수정한 결과를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    public boolean updateCommentDto(CommentDto dto){
        return repository.updateComment(dto);
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
    public boolean hasResponse(ResponseDto dto) {
        return repository.hasResponse(dto);
    }

    /**
     * <p>좋아요 상태를 변경하는 메서드</p>
     *
     * @param  dto 사용자의 고유값, 댓글의 고유값이 포함된 데이터 전송용 객체
     * @return 사용자가 댓글의 호응 상태를 변경한 결과를 반환
     * @since  2023. 12. 13.
     * @author Seungyun Lee (@Seungyun6857)
     */
    public boolean updateResponse(ResponseDto dto) {
        boolean hasResponse = repository.hasResponse(dto);
        boolean result;

        // 호응이 되어 있는지의 여부를 확인함
        if (hasResponse) {
            // 만약 호응이 되어 있다면 취소
            result = repository.deleteResponse(dto);
        } else {
            // 만약 호응이 되어 있지 않다면 생성
            result = repository.createResponse(dto);
        }
        return result;
    }
}

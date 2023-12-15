package com.dita.metapilot.comment.repository;

import com.dita.metapilot.comment.dto.*;
import com.dita.metapilot.comment.entity.CommentEntity;
import org.apache.ibatis.annotations.Mapper;


import java.util.List;

/**
 * <p>댓글과 관련된 요청을 처리하는 서비스</p>
 *
 * @since   2023. 12. 11.
 * @author  Kiseok Kang (@jUqItEr)
 * @author  Seungyun Lee (@Seungyun6857)
 * @version 1.5.2
 */
@Mapper
public interface CommentRepository {
    boolean createComment(RefDto dto);

    boolean deleteComment(CommentDto dto);

    boolean updateComment(CommentDto dto);

    boolean updateRootId(RefDto dto);

    long getLastId();

    long getTotalCount(PostRequestDto dto);

    List<CommentEntity> getCommentList(PostRequestDto dto);

    boolean createResponse(ResponseDto dto);

    boolean deleteResponse(ResponseDto dto);

    boolean hasResponse(ResponseDto dto);
}

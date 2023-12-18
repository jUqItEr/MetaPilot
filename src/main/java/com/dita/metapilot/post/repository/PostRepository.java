package com.dita.metapilot.post.repository;

import com.dita.metapilot.post.dto.*;
import com.dita.metapilot.post.entity.CategoryPostEntity;
import com.dita.metapilot.post.entity.PostEntity;
import com.dita.metapilot.post.dto.PostTagDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.security.core.parameters.P;

import java.util.List;

/**
 * <p>게시글 관련 데이터 액세스 인터페이스</p>
 * <p>MyBatis의 Mapper로 지정하여 게시글 관련 데이터베이스 액세스를 수행.</p>
 *
 * @author 곽성원 (@SungwonGwak)
 * @since 2023. 11. 28.
 * @version 1.0.0
 */

@Mapper
public interface PostRepository {

    /**
     * 해시태그를 생성하는 메서드.
     *
     * @param hashTagDto 생성할 해시태그 정보를 담은 DTO.
     * @return 생성된 해시태그의 id를 반환, 생성 실패시 0을 반환.
     */
    int createHashtag(HashtagDto hashTagDto);

    /**
     * 게시글에 좋아요를 추가하는 메서드.
     *
     * @param postResponseDto 게시글 번호와 사용자의 ID를 담은 DTO.
     * @return 게시글에 좋아요를 성공적으로 추가하면 true, 그렇지 않으면 false를 반환.
     */
    boolean createLike(PostResponseDto postResponseDto);

    /**
     * 게시글을 작성하는 메서드.
     *
     * @param postDto
     * @return
     */
    boolean createPost(PostDto postDto);

    /**
     * 게시글에 해시태그를 연결하는 메서드.
     *
     * @param postTagDto 게시글과 해시태그를 연결할 정보를 담은 DTO.
     * @return 게시글에 해시태그를 성공적으로 연결하면 true, 그렇지 않으면 false를 반환.
     */
    boolean createPostHashtag(PostTagDto postTagDto);


    /**
     * 게시글에 연결된 해시태그 삭제하는 메서드.
     *
     * @param postIdDto 게시글 번호가 담긴 DTO.
     * @return 게시글과 연결된 해시태그를 삭제
     */
    void deleteHashtags(PostIdDto postIdDto);

    /**
     * 여러 개의 게시글 삭제하는 메서드
     *
     * @param postIdsDto 게시글 번호들이 담긴 DTO.
     * @return
     */
    boolean deletePosts(PostIdsDto postIdsDto);

    /**
     * 해시태그로 게시글을 조회하는 메서드.
     *
     * @param hashtags 입력한 해시태그 .
     * @return 검색된 게시글 목록을 반환
     */
    List<PostDto> findPostByHashtag(List<String> hashtags);

    /**
     * 모든 해시태그 가져오는 메서드
     *
     * @return 모든 해시태그 목록 반환
     */
    List<HashtagDto> getAllHashtags();

    /**
     * 공지사항 게시글 리스트를 불러 오는 메서드.
     *
     * @return 공지사항 게시글 리스트를 반환
     */
    List<PostEntity> getNotciePosts();

    /**
     * 인기 게시글 리스트를 불러 오는 메서드.
     *
     * @return 인기 게시글 리스트를 반환
     */
    List<PostPopularDto> getPopularPosts();

    /**
     * 게시글 리스트 페이지에서 전체 게시글 개수를 가져오는 메서드.
     *
     * @return 전체 게시글 개수를 반환.
     */
    int getPostCount(PagingDto pagingDto);

    /**
     * 게시글을 조회하는 메서드.
     *
     * @param postIdDto 게시글 번호가 담긴 DTO.
     * @return 해당 게시글 번호를 가진 게시글의 PostEntity 객체. 해당 게시글이 없으면 null을 반환
     */
    PostEntity getPostView(PostIdDto postIdDto);

    /**
     * 해시태그가 있으면 해당 해시태그의 id를 가져오는 메서드.
     *
     * @param hashtagDto 해시태그 ID가 담긴 DTO.
     * @return 해당 해시태그가 존재하면 id, 존재하지 않으면 0을 반환.
     */
    long getHashtagId(HashtagDto hashtagDto);

    /**
     * 게시글의 해시태그를 조회하는 메서드.
     *
     * @param postIdDto 게시글 번호를 담은 DTO.
     * @return 게시글에 연결된 해시태그 목록을 반환
     */
    List<HashtagDto> getHashtags(PostIdDto postIdDto);

    /**
     * 게시글의 좋아요 리스트 가져오는 메서드.
     *
     * @param
     * @return
     */
    List<PostLikesDto> getLikesList(PostIdDto postIdDto);

    /**
     * 임시저장된 리스트 가져오는 메서드.
     *
     * @param
     * @return
     */
    List<PostDto> getTemporaryList(UserIdDto userIdDto);

    /**
     * 임시저장된 게시글 개수를 가져오는 메서드.
     *
     * @param
     * @return
     */
    int getTemporaryCount(UserIdDto userIdDto);

    /**
     * 해시태그 중복을 체크하는 메서드.
     *
     * @param hashTagDto 해시태그 내용이 담긴 DTO.
     * @return 해당 해시태그 내용이 존재하면 true, 그렇지 않으면 false를 반환.
     */
    boolean hasHashtag(HashtagDto hashTagDto);

    /**
     * 게시글과 연결된 해시태그 중복을 체크하는 메서드.
     *
     * @param postTagDto 게시글과 연결된 해시태그 정보가 담긴 DTO.
     * @return 해당 해시태그 내용이 존재하면 true, 그렇지 않으면 false를 반환.
     */
    boolean hasPostHashtag(PostTagDto postTagDto);

    /**
     * 게시글에 좋아요가 있는지를 체크하는 메서드.
     *
     * @param postResponseDto 게시글 번호와 사용자의 ID를 담은 DTO.
     * @return 게시글 번호에대한 사용자의 ID가 존재하면 true, 그렇지 않으면 false를 반환.
     */
    boolean hasLike(PostResponseDto postResponseDto);

    /**
     * 최근에 작성된 게시글번호 를 가져오는 메서드.
     *
     * @return 최근에 작성된 게시글 번호를 반환.
     */
    long getRecentPostId();

    /**
     * 게시글 리스트를 가져오는 메서드.
     *
     * @return 게시글 리스트를 반환.
     */
    List<PostEntity> getPagingView(PagingDto pagingDto);

    /**
     * 전체 게시글 리스트를 가져오는 메서드.
     *
     * @return 게시글 리스트를 반환.
     */
    List<PostEntity> getPagingViewAll(PagingDto pagingDto);

    /**
     * 게시글에 연결된 좋아요를 취소하는 메서드.
     *
     * @param postResponseDto 게시글 번호와 사용자의 ID를 담은 DTO.
     * @return 게시글에 연결된 좋아요를 성공적으로 취소하면 true, 그렇지 않으면 false를 반환.
     */
    boolean revokeLike(PostResponseDto postResponseDto);

    /**
     * 게시글의 조회수를 증가시키는 메서드.
     *
     * @param postIdDto 게시글 번호가 담긴 DTO.
     * @return 게시글의 조회수를 성공적으로 증가시키면 true, 그렇지 않으면 false를 반환.
     */
    boolean updateCount(PostIdDto postIdDto);

    /**
     * 게시글의 정보를 수정하는 메서드.
     *
     * @param postDto 사용자가 작성한 게시글 정보를 담은 DTO.
     * @return 게시글의 정보를 성공적으로 수정하면 true, 그렇지 않으면 false를 반환.
     */
    boolean updatePost(PostDto postDto);

    /**
     * 카테고리 id 값에 해당하는 게시글 데이터 불러오기
     *
     * @param postSearchDto 사용자가 작성한 게시글 정보를 담은 DTO.
     * @return 카테고리 id를 성공적으로 수정하면 true, 그렇지 않으면 false를 반환.
     */
    List<CategoryPostEntity> categoryDataList(PostSearchDto postSearchDto);

}

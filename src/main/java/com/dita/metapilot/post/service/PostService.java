package com.dita.metapilot.post.service;

import com.dita.metapilot.post.dto.*;
import com.dita.metapilot.post.entity.PostEntity;
import com.dita.metapilot.post.dto.HashtagDto;
import com.dita.metapilot.post.file.dto.PostFileDto;
import com.dita.metapilot.post.file.service.PostFileService;
import com.dita.metapilot.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>게시글 관련 서비스</p>
 *
 * <p>게시글과 관련된  로직을 처리하는 서비스 클래스</p>
 *
 * @author 곽성원 (@SungwonGwak)
 * @since 2023. 11. 28.
 * @version 1.0.0
 */
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostFileService postFileService;

    /**
     * <p>게시글을 작성하는 메서드(작성페이지 넘어갈때 postDto 반환)</p>
     *
     * @param postDto 사용자가 작성한 게시글 정보를 담은 DTO.
     * @return 성공적으로 게시글을 작성했을 때 true 반환
     */
    public boolean createPost(PostDto postDto) {
        return postRepository.createPost(postDto);
    }
    /**
     * <p>게시글을 삭제하는 메서드</p>
     *
     * @param postIdDto 게시글의 번호가 담긴 DTO.
     * @return 성공적으로 게시글을 삭제했을 때 true 반환
     */
    public boolean deletePost(PostIdDto postIdDto) {
        return postRepository.deletePost(postIdDto);
    }

    /**
     * <p>해시태그로 게시글을 조회하는 메서드</p>
     *
     * @param hashtags 생성된 해시태그.
     * @return 조회된 게시글 목록을 반환.
     */
    public List<PostDto> findPostByHashtag(List<String> hashtags) {
        return postRepository.findPostByHashtag(hashtags);
    }

    /**
     * <p>게시글에 좋아요 누른 유저 목록</p>
     *
     * @param
     * @return
     */
    public List<PostLikesDto> getLikesList(PostIdDto postIdDto) {

        return postRepository.getLikesList(postIdDto);
    }

    /**
     * <p>공지사항 게시글 리스트를 불러오는 메서드</p>
     *
     * @return 불러온 공지사항 게시글 리스트를 반환.
     */
    public List<PostEntity> getNotciePosts() {
        return postRepository.getNotciePosts();
    }

    /**
     * <p>인기 게시글 리스트를 불러오는 메서드</p>
     *
     * @return 불러온 인기 게시글 리스트를 반환.
     */
    public List<PostPopularDto> getPopularPosts() {
        return postRepository.getPopularPosts();
    }

    /**
     * <p>게시글을 조회하는 메서드</p>
     *
     * <p>1. 게시글 조회시 조회수 카운트가 증가하도록 updateCount 메서드 호출</p>
     * <p>2. postRepository.getPostView 메서드로 게시글을 불러옴</p>
     * <p>3. 해당 게시글에 연결된 해시태그 목록들을 가져옴</p>
     *
     * @param postIdDto 게시글 번호를 담은 DTO.
     * @return 성공적으로 게시글을 조회하면 해당 게시글 정보와 연결된 해시태그 목록을 담은 PostViewDto 반환
     */
    public PostViewDto getPostView(PostIdDto postIdDto) {
        updateCount(postIdDto);
        PostEntity postEntity = postRepository.getPostView(postIdDto);

        List<HashtagDto> hashtags = postRepository.getHashtags(postIdDto);
        List<PostFileDto> files = postFileService.getPostFile(postIdDto);
        PostViewDto result = new PostViewDto(postEntity, hashtags, files);

        return result;
    }

    public List<PostEntity> getPostPageView(PagingDto pagingDto) {
        return postRepository.getPagingView(pagingDto);
    }

    /**
     * <p>게시글의 좋아요 상태를 체크하는 메서드</p>
     *
     * @param postResponseDto 게시글 번호를 담은 DTO.
     * @return 성공적으로 게시글 좋아요 상태를 체크하면 true 반환, 그렇지 않으면 false 반환
     */
    public boolean haslike(PostResponseDto postResponseDto) {
        return postRepository.hasLike(postResponseDto);
    }

    /**
     * <p>게시글의 조회수를 증가시키는 메서드</p>
     *
     * @param postIdDto 게시글 번호를 담은 DTO.
     * @return 성공적으로 게시글 조회수를 업데이트했을 때 true 반환, 그렇지 않으면 false 반환
     */
    public boolean updateCount(PostIdDto postIdDto) {
        return postRepository.updateCount(postIdDto);
    }

    /**
     * <p>게시글 좋아요 추가 또는 취소하는 메서드</p>
     *
     * <p>1. 게시글에 좋아요가 존재하는지를 확인하기 위해 haslike 메서드를 호출하여 haslike변수에 담음</p>
     * <p>2. haslike가 true이면, 좋아요가 존재하므로 'revokeLike' 메서드를 통해 해당 정보 삭제</p>
     * <p>   haslike가 false이면, 좋아요가 없으므로 'createLike' 메서드를 통해 해당 정보 추가</p>
     *
     * @param postResponseDto 게시글 번호와 사용자의 ID를 담은 DTO.
     * @return 성공적으로 게시글에 좋아요를 추가하거나 취소했을 때 true 반환, 그렇지 않으면 false 반환
     */
    public boolean updateLike(PostResponseDto postResponseDto) {
        boolean haslike = postRepository.hasLike(postResponseDto);

        if (haslike){
            return postRepository.revokeLike(postResponseDto);
        } else {
            return postRepository.createLike(postResponseDto);
        }
    }

    /**
     * <p>게시글을 작성, 수정하는 메서드</p>
     *
     * <p>1. 게시글 작성, 수정 메서드 실행</p>
     * <p>2. 게시글 수정 인경우 연결된 해시태그와 첨부파일 삭제
     * <p>3. 해시태그 중복 메서드를 체크한 후 해시태그 생성</p>
     * <p>4. 첨부파일이 있을 경우 새로운 첨부파일 업로드</p>
     *
     * @param postDto 사용자가 작성한 게시글 정보를 담은 DTO.
     * @param tags 게시글에 연결된 태그들
     * @param files 게시글에 연결된 파일들
     *
     * @return 성공적으로 게시글을 작성, 수정했을 때 true 반환, 그렇지 않으면 false 반환
     */
    public boolean updatePost(PostDto postDto, List<String> tags, List<MultipartFile> files) {
        // 게시글 작성 or 수정 체크
        boolean isPostNew = (postDto.getCreatedAt() == null || postDto.getCreatedAt().isEmpty());
        boolean result = postRepository.updatePost(postDto);
        long postId = postDto.getPostId();
        PostIdDto postIdDto = new PostIdDto(postId);

        // 게시글 수정 인경우
        if (!isPostNew) {
            postRepository.deleteHashtags(postIdDto);
            postFileService.deletePostFile(postIdDto);
        }

        if (tags != null) {
            for (String tag : tags) {
                HashtagDto hashtag = new HashtagDto(-1, tag);
                boolean hasTag = postRepository.hasHashtag(hashtag); //True
                long id = -1;
                if (hasTag) {
                    // 해시태그가 있으면 hashtag_tbl에서 가져올 것
                    id = postRepository.getHashtagId(hashtag); //아이디만
                } else {
                    // 해시태그가 없으면 hashtag_tbl에 추가할 것
                    postRepository.createHashtag(hashtag); //없으면 추가
                    id = hashtag.getHashtagId(); //추가한 아이디
                }
                PostTagDto dto = new PostTagDto(postId, id, null);
                // 게시글과 연결된 해시태그가 없다면
                if (!postRepository.hasPostHashtag(dto)) {
                    postRepository.createPostHashtag(dto);
                }
            }
        }
        if (files != null) {
            postFileService.createFiles(postIdDto, files);
        }
        return result;
    }
}
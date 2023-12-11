package com.dita.metapilot.post.service;

import com.dita.metapilot.post.dto.*;
import com.dita.metapilot.post.entity.PostEntity;
import com.dita.metapilot.post.dto.HashtagDto;
import com.dita.metapilot.post.postFile.dto.PostFileDto;
import com.dita.metapilot.post.postFile.service.PostFileService;
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
     * <p>게시글을 작성하는 메서드</p>
     *
     * <p>1. 게시글을 작성하고, 해당 게시글의 번호를 가져옴</p>
     * <p>2. 각 해시태그 중복 여부 확인을 위해 post.Repository.hasHashtag 메서드 호출</p>
     * <p>3. 해시태그 중복이 있을 경우 hashtag_tbl에서 해시태그를 가져옴</p>
     * <p>4. 해시태그 중복이 없을 경우 postRepository.createHashtag 메서드를 사용하여 해당 해시태그 생성</p>
     * <p>5. 첨부파일이 있을 경우 postFileService.createFiles 메서드를 사용하여 첨부파일 업로드</p>
     * <p>5. 게시글과 해시태그를 연결하는 메서드 실행</p>
     *
     * @param postDto 사용자가 작성한 게시글 정보를 담은 DTO.
     * @param tags 게시글에 포함된 해시태그들 목록
     * @param files 게시글에 포함된 파일들 목록
     * @return 성공적으로 게시글을 작성했을 때 true 반환
     */
    public boolean createPost(PostDto postDto, List<String> tags, List<MultipartFile> files) {
        boolean result = false;

        result = postRepository.createPost(postDto);
        int postId = postRepository.getRecentPostId();

        if (tags != null) {
            for (String tag : tags) {
                HashtagDto hashtag = new HashtagDto(-1, tag);
                boolean hasTag = postRepository.hasHashtag(hashtag);
                int id = -1;

                if (hasTag) {
                    // 해시태그가 있으면 hashtag_tbl에서 가져올 것
                    id = postRepository.getHashtagId(hashtag);
                } else {
                    // 해시태그가 없으면 hashtag_tbl에 추가할 것
                    postRepository.createHashtag(hashtag);
                    id = hashtag.getHashtagId();
                }
                PostTagDto dto = new PostTagDto(postId, id, null);
                result &= postRepository.createPostHashtag(dto);
            }
        }
        if (files != null) {
            result &= postFileService.createFiles(postId, files);
        }
        return result;
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
    public List<PostEntity> getPopularPosts() {
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
     * <p>게시글을 수정하는 메서드</p>
     *
     * <p>1. 게시글 수정 메서드 실행</p>
     * <p>2. 연결된 해시태그가 있으면 기존에 연결된 해시태그를 삭제 하고 새로운 해시태그 생성함 </p>
     * <p>3. 연결된 첨부파일이 있으면 기존에 첨부된 파일을 삭제하고 새로운 첨부파일 업로드</p>
     *
     * @param postDto 사용자가 작성한 게시글 정보를 담은 DTO.
     * @param tags 게시글에 연결된 태그들
     * @param files 게시글에 연결된 파일들
     *
     * @return 성공적으로 게시글을 수정했을 때 true 반환, 그렇지 않으면 false 반환
     */
    public boolean updatePost(PostDto postDto, List<String> tags, List<MultipartFile> files) {
        boolean result = false;
        int postId = postDto.getPostId();

        // 1. 게시글 수정
        result = postRepository.updatePost(postDto);

        // 2. 연결된 해시태그 수정
        if (tags != null) {
            // 기존 게시글에 연결된 해시태그들 삭제
            result &= postRepository.deleteHashtags(postId);

            // 새로 수정된 해시태그 연결
            for (String tag : tags) {
                HashtagDto hashtag = new HashtagDto(-1, tag);
                boolean hasTag = postRepository.hasHashtag(hashtag);
                int id = -1;

                if (hasTag) {
                    // 해시태그가 있으면 hashtag_tbl에서 가져올 것
                    id = postRepository.getHashtagId(hashtag);
                } else {
                    // 해시태그가 없으면 hashtag_tbl에 추가할 것
                    postRepository.createHashtag(hashtag);
                    id = hashtag.getHashtagId();
                }
                PostTagDto dto = new PostTagDto(postId, id, null);
                result &= postRepository.createPostHashtag(dto);
            }
        }

        // 3. 첨부파일 수정
        if (files != null) {
            result &= postFileService.deletePostFile(postId);
            result &= postFileService.createFiles(postId, files);
        }

        return result;
    }
}
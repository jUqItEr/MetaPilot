
package com.dita.metapilot.post.postFile.repository;

import com.dita.metapilot.post.dto.PostIdDto;
import com.dita.metapilot.post.dto.PostResponseDto;
import com.dita.metapilot.post.postFile.dto.PostFileDto;
import com.dita.metapilot.post.postFile.entity.PostFileEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.core.io.ByteArrayResource;

import java.util.List;
import java.util.Map;

@Mapper
public interface PostFileRepository {

    /**
     * 첨부파일을 업로드 하는 메서드.
     *
     * @param files 첨부파일 정보를 담은 리스트.
     * @return 생성된 첨부파일들을 반환.
     */
    int createFile(List<PostFileDto> files);

    /**
     * 게시글에 연결된 첨부파일을 삭제하는 메서드.
     *
     * @param postId 첨부파일을 삭제할 게시글의 ID.
     * @return 첨부파일 삭제 성공 여부를 반환.
     */
    boolean deletePostFile(int postId);

    /**
     * 게시글에 연결된 첨부파일을 조회하는 메서드.
     *
     * @param postIdDto 조회할 게시글의 ID를 담은 DTO.
     * @return 해당 게시글 번호를 가진 게시글의 첨부파일 정보를 담은 리스트. 해당 첨부파일이 없으면 빈 리스트를 반환.
     */
    List<PostFileDto> getPostFile(PostIdDto postIdDto);

    /**
     * 첨부파일을 다운로드하는 메서드.
     *
     * @param fileName 다운로드할 파일의 이름.
     * @return 파일의 내용을 바이트 배열로 반환.
     */
    byte[] downloadFile(String fileName);

    /**
     * 원본 파일이름과 확장자를 가져오는 메서드.
     *
     * @param fileName UUID처리된 파일이름.
     * @return 원본 파일이름과 확장자를 반환.
     */
    PostFileDto getOriginalName(String fileName);
}
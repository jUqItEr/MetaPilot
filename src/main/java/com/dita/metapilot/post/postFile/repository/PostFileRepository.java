
package com.dita.metapilot.post.postFile.repository;

import com.dita.metapilot.post.dto.PostIdDto;
import com.dita.metapilot.post.dto.PostResponseDto;
import com.dita.metapilot.post.postFile.dto.PostFileDto;
import com.dita.metapilot.post.postFile.entity.PostFileEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PostFileRepository {

    int createFile(List<PostFileDto> files);


    List<PostFileDto> getPostFile(PostIdDto postIdDto);

}
/**
     * 게시글의 첨부파일을 조회하는 메서드.
     *
     * @param postResponseDto 게시글 조회에 필요한 정보를 담은 DTO.
     * @return 해당 게시글 번호를 가진 게시글의 첨부파일 정보를 담은 PostFileEntity 객체. 해당 첨부파일이 없으면 null을 반환
     *//*

    PostFileEntity getPostFile(PostResponseDto postResponseDto);

    */

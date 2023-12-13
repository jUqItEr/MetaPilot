package com.dita.metapilot.comment.file.repository;

import com.dita.metapilot.comment.file.dto.FileDto;
import org.apache.ibatis.annotations.Mapper;


/*
 * 파일 리포지토리는 파일과 관련된 데이터베이스 작업을 담당
 * FileEntity와 FileDto를 사용하여 파일과 관련된 정보를 처리
 *
 * @param FileDto       파일 정보를 담은 DTO
 * @param FileEntity    파일 데이터를 담은 엔터티
 * @author Seung yun Lee (@Seungyun)
 * @since 2023. 12. 11.
 * @version 1.0.0
 */
@Mapper
public interface FileRepository {

    /*
     * 파일을 생성하는 메서드
     *
     * @param file 파일 정보를 담은 FileDto 객체
     * @return 생성된 파일의 결과를 나타내는 정수 값
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    int createFile(FileDto fileDto);

}

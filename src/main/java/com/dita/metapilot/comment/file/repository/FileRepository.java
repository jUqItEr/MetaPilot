package com.dita.metapilot.comment.file.repository;

import com.dita.metapilot.comment.file.dto.FileDto;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>파일 데이터에 대한 데이터베이스 작업을 정의하는 MyBatis Mapper 인터페이스입니다.</p>
 * <p>파일 정보의 저장 및 관리를 담당하며, FileDto를 통해 데이터 전송을 처리합니다.</p>
 * @since 2023. 12. 15.
 * @author Seung yun Lee (@Seungyun6857)
 * @version 1.1.0
 */
@Mapper
public interface FileRepository {

    /**
     * <p>새로운 파일 정보를 데이터베이스에 저장하는 메서드입니다.</p>
     * @param file 파일 정보를 담은 FileDto 객체
     * @return 데이터베이스에 생성된 파일의 ID를 반환합니다. 성공 시 생성된 파일의 ID, 실패 시 0 또는 예외 반환
     * @since 2023. 12. 15.
     * @author Seung yun Lee (@Seungyun6857)
     * @version 1.1.0
     */
    long createFile(FileDto file);
}

package com.dita.metapilot.comment.file.service;

import com.dita.metapilot.comment.file.dto.FileDto;
import com.dita.metapilot.comment.file.repository.FileRepository;
import com.dita.metapilot.exception.CustomValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private Path filePath;

    /*
     * 새로운 파일을 생성하는 메서드
     *
     * @param commentId 댓글 ID
     * @param file      업로드할 파일
     * @return 파일 생성 여부
     * @throws CustomValidationException 파일 유효성 예외 발생
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    public boolean createFile(int commentId, MultipartFile file) {
        // 파일이 선택되지 않았을 경우 예외 처리
        if (file.getSize() < 1) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("file", "파일을 선택하세요.");

            throw new CustomValidationException(errorMap);
        }

        // 파일 정보 추출
        String fileName = file.getOriginalFilename();
        String originFileName = fileName.substring(0, fileName.lastIndexOf('.'));
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
        String name = UUID.randomUUID().toString().replaceAll("-", "") + "." + extension;
        long fileSize = file.getSize();

        // 파일 경로 설정 및 폴더 생성
        Path uploadPath = Paths.get(filePath + "comment/commentFile/" + name);
        File f = new File(filePath + "comment/commentFile");
        if (!f.exists()) {
            f.mkdirs();
        }

        // 파일 저장
        try {
            Files.write(uploadPath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 파일 정보 저장을 위한 DTO 생성
        FileDto commentFile = new FileDto(commentId, name, originFileName, extension, fileSize);

        // 파일 저장 정보 저장
        fileRepository.createFile(commentFile);
        return true;
    }

}

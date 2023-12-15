package com.dita.metapilot.comment.file.service;

import com.dita.metapilot.comment.file.dto.FileDto;
import com.dita.metapilot.comment.file.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    /**
     * <p>서버에 파일을 업로드하고 해당 파일의 메타데이터를 저장</p>
     * @param file 업로드할 파일의 데이터를 포함하는 MultipartFile 객체
     * @since 2023. 12. 15.
     * @author Seung yun Lee (@Seungyun6857)
     * @version 1.1.0
     */
    public boolean createFile(MultipartFile file) {

        try {
            if (file != null && !file.isEmpty()) {

                String fileName = file.getOriginalFilename();
                String originFileName = fileName.substring(0, fileName.lastIndexOf('.'));
                String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
                String name = UUID.randomUUID().toString().replaceAll("-", "");
                String uuidName = name + "." + extension;
                long fileSize = file.getSize();

                String assetsPath = "src/main/resources/assets";
                Path uploadPath = Paths.get(assetsPath);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                try {
                    Path filePath = uploadPath.resolve(uuidName);
                    Files.write(filePath, file.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                FileDto fileDto = new FileDto();
                long commentId = fileDto.getCommentId();

                FileDto commentFile = new FileDto(commentId, name, originFileName, extension, fileSize);

                fileRepository.createFile(commentFile);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }
}

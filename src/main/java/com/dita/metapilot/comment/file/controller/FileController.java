package com.dita.metapilot.comment.file.controller;

import com.dita.metapilot.comment.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class FileController {
    private final FileService fileService;

    /**
     * <p>파일을 서버에 업로드하고 파일 메타데이터를 저장합니다.</p>
     *
     * @param  file 업로드할 파일의 데이터를 포함하는 MultipartFile 객체
     * @return 객체를 반환하여 파일 업로드 성공 여부를 나타냅니다.
     *         성공 시 사용자에게 "성공적으로 생성되었습니다." 메시지 전달
     * @since  2023. 12. 15.
     * @author Seungyun Lee (@Seungyun6857)
     */
    @ResponseBody
    @PostMapping(value = "/file/list", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createFile(@RequestPart MultipartFile file) {
        fileService.createFile(file);
        return ResponseEntity.ok().body("성공적으로 생성되었습니다.");
    }
}

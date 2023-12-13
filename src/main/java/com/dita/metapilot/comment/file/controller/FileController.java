package com.dita.metapilot.comment.file.controller;

import com.dita.metapilot.comment.file.dto.FileDto;
import com.dita.metapilot.comment.file.dto.FileIdDto;
import com.dita.metapilot.comment.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/*
 * FileController는 댓글과 관련된 파일 업로드 HTTP 요청을 처리
 * 댓글에 연관된 파일을 생성하는 기능을 제공
 *
 * @param FileEntity      파일 데이터를 담은 객체
 * @param FileService     파일 관련 작업을 수행하는 서비스
 * @author Seung yun Lee (@Seungyun)
 * @since 2023. 12. 11.
 * @version 1.0.0
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class FileController {
    private final FileService fileService;

    /*
     * 댓글과 연관된 파일 생성
     *
     * @param commentId 댓글과 연관된 파일의 ID
     * @param file      파일 데이터를 담은 MultipartFile
     * @return          파일 생성 성공 여부를 나타내는 ResponseEntity
     * @author Seung yun Lee (@Seungyun)
     * @since 2023. 12. 11.
     * @version 1.0.0
     */
    @ResponseBody
    @PostMapping(value = "/file/files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createFile(@RequestPart("file") MultipartFile file, @RequestPart("fileIdDto") FileIdDto fileIdDto) {
        fileService.createFile(file, fileIdDto);

        return ResponseEntity.ok().body("성공적으로 생성되었습니다.");
    }




}


package com.dita.metapilot.post.file.controller;

import com.dita.metapilot.post.dto.PostIdDto;
import com.dita.metapilot.post.file.dto.PostFileDto;
import com.dita.metapilot.post.file.dto.PostFileIdDto;
import com.dita.metapilot.post.file.service.PostFileService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/post/files")
public class PostFileController {

    private final PostFileService postFileService;

    /**
     * <p>게시글에 이미지를 추가하는 컨트롤러 메서드</p>
     *
     * @param postIdDto 게시글 번호가 담긴 DTO.
     * @return 게시글에 이미지 추가 성공시 true, 실패시 false
     */
    @ResponseBody
    @PostMapping("/create")
    public ResponseEntity<?> createImages(@RequestPart PostIdDto postIdDto, @RequestPart(required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(postFileService.createImages(postIdDto ,files));
    }

    /**
     * <p>게시글에 있는 파일을 삭제하는 컨트롤러 메서드</p>
     *
     * @param postFileIdDto 파일 번호가 담긴 DTO.
     * @return
     */
    @ResponseBody
    @PostMapping("/delete")
    public ResponseEntity<Boolean> deleteFile(@RequestBody PostFileIdDto postFileIdDto) {
        return ResponseEntity.ok(postFileService.deleteFile(postFileIdDto));
    }

    /**
     * <p>파일 다운로드를 처리하는 컨트롤러 메서드</p>
     *
     * <p>1. 주어진 파일 이름으로부터 파일의 내용을 바이트 배열로 가져옴</p>
     * <p>2. 다운로드할 파일의 경로를 얻기 위해 postFileService.getOriginalFileName 메서드를 호출하여 실제 파일 경로를 가져옴</p>
     * <p>3. HTTP 응답 헤더를 설정하여 브라우저에게 다운로드할 파일의 정보를 알려줌</p>
     * <p>4. 파일의 확장자를 이용하여 MIME 타입을 추론하고, MIME 타입이 없을 경우 기본 이진 파일(MIME: application/octet-stream)로 설정</p>
     * <p>5. HTTP 응답 헤더, 파일 크기, 파일 내용을 바탕으로 ResponseEntity를 생성하여 반환</p>
     *
     * @param fileName 다운로드할 파일의 이름
     * @return HTTP 응답을 담은 ResponseEntity 객체
     */
    @ResponseBody
    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadFile(@RequestParam String fileName) {
        try {

            byte[] fileContent = postFileService.downloadFile(fileName);

            String filePath = postFileService.getOriginalFileName(fileName);

            PostFileDto fileDto = postFileService.getOriginalName(fileName);
            String originalName = fileDto.getOriginalName();
            String extension = fileDto.getExtension();
            // 원본 파일 이름(확장자포함) 인코딩 처리
            String downloadFileName = java.net.URLEncoder.encode(originalName + "." + extension, "UTF-8").replaceAll("\\+", "%20");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentDispositionFormData("attachment", downloadFileName);

            // 파일의 확장자를 이용하여 MIME 타입을 설정
            Path path = Paths.get(filePath);
            String mimeType = Files.probeContentType(path);
            if (mimeType == null) {
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            } else {
                headers.setContentType(MediaType.parseMediaType(mimeType));
            }

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(fileContent.length)
                    .body(fileContent);
        } catch (FileNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * <p>게시글의 이미지 리스트를 가져오는 컨트롤러 메서드</p>
     *
     * @param postIdDto 게시글 번호가 담긴 DTO.
     * @return 해당 게시글의 타입이 이미지인 파일 리스트 return
     */
    @ResponseBody
    @GetMapping("/images")
    public ResponseEntity<List<PostFileDto>> getPostImages(PostIdDto postIdDto) {
        return ResponseEntity.ok(postFileService.getPostImages(postIdDto));
    }
}

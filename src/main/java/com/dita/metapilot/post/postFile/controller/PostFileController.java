package com.dita.metapilot.post.postFile.controller;

import com.dita.metapilot.post.postFile.dto.PostFileDto;
import com.dita.metapilot.post.postFile.service.PostFileService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.CommandMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/post/files")
public class PostFileController {

    private final PostFileService postFileService;

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
}

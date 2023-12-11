package com.dita.metapilot.post.postFile.controller;

import com.dita.metapilot.post.postFile.service.PostFileService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.CommandMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostFileController {

    private final PostFileService postFileService;


    /*
    private final PostFileService postFileService;

    @ResponseBody
    @PostMapping(value = "/file/{postId}/files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createFiles(@PathVariable int postId, @RequestPart List<MultipartFile> files) {
        postFileService.createFiles(postId, files);

        return ResponseEntity.ok().body("Successfully");
    }
     */
}

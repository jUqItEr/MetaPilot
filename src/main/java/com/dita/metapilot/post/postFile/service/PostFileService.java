
package com.dita.metapilot.post.postFile.service;

import com.dita.metapilot.exception.CustomValidationException;
import com.dita.metapilot.post.dto.PostIdDto;
import com.dita.metapilot.post.postFile.dto.PostFileDto;
import com.dita.metapilot.post.postFile.repository.PostFileRepository;
import com.dita.metapilot.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.Value;
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
public class PostFileService {

    private final PostFileRepository postFileRepository;
    private final PostRepository postRepository;
    private String filePath;

    public boolean createFiles(int postId, List<MultipartFile> files) {

        List<PostFileDto> postFiles = new ArrayList<PostFileDto>();

        files.forEach(file -> {
            String fileName = file.getOriginalFilename();
            String originFileName = fileName.substring(0,  fileName.lastIndexOf('.'));
            String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
            String name = UUID.randomUUID().toString().replaceAll("-","") + "." + extension;
            int filesize = files.size();

            Path uploadPath = Paths.get(filePath + "post/postFile/" + name);

            File f = new File(filePath + "post/postFile");
            if (!f.exists()) {
               f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            PostFileDto postFileDto = new PostFileDto(postId, name, originFileName, extension, filesize);

            postFiles.add(postFileDto);
        });

        postFileRepository.createFile(postFiles);

        return true;
    }

    public List<PostFileDto> getPostFile(PostIdDto postIdDto) {
        return postFileRepository.getPostFile(postIdDto);
    }
}




package com.dita.metapilot.post.postFile.service;

import com.dita.metapilot.post.dto.PostIdDto;
import com.dita.metapilot.post.postFile.dto.PostFileDto;
import com.dita.metapilot.post.postFile.repository.PostFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PostFileService {

    private final PostFileRepository postFileRepository;

    /**
     * <p>첨부파일을 업로드하는 메서드</p>
     *
     * <p>1. assets 디렉토리(파일저장소)가 존재하지 않으면 생성</p>
     * <p>2. 각 첨부파일에 대해 UUID로 고유한 파일명을 생성</p>
     * <p>3. 파일들을 assets 디렉토리에 저장</p>
     * <p>5. PostFileDto 객체를 생성후 해당 파일의 정보를 입력 한 후 목록에 추가</p>
     * <p>6. postFileRepository.createFile 메서드로 파일 정보를 DB에 저장</p>
     *
     * @param postIdDto 게시글 번호가 담긴 DTO.
     * @param files 업로드할 첨부파일 목록
     * @return 성공적으로 파일을 업로드했을 때 true 반환
     */
    public boolean createFiles(PostIdDto postIdDto, List<MultipartFile> files) {
        List<PostFileDto> postFiles = new ArrayList<>();
        long postId = postIdDto.getPostId();

        try {
            Resource resource = new ClassPathResource("assets/");
            Path uploadPath = Paths.get(resource.getURI());

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            files.forEach(file -> {
                String fileName = file.getOriginalFilename();
                String originalName = fileName.substring(0, fileName.lastIndexOf('.'));
                String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
                String name = UUID.randomUUID().toString().replaceAll("-", "");
                String uuidName = name + "." + extension;
                long fileSize = files.size();

                try {
                    Path filePath = uploadPath.resolve(uuidName);
                    Files.write(filePath, file.getBytes());

                    PostFileDto postFileDto = new PostFileDto(postId, name, originalName, extension, fileSize, 0);
                    postFiles.add(postFileDto);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });

            postFileRepository.createFile(postFiles);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return true;
    }

    /**
     * <p>게시글에 연결된 첨부파일 목록을 조회하는 메서드</p>
     *
     * <p>1. 게시글 번호(postId)로 해당 게시글과 연결된 첨부파일 목록을 조회</p>
     * <p>2. 조회된 첨부파일 정보를 PostFileDto로 반환</p>
     *
     * @param postIdDto 게시글 번호를 담은 DTO
     * @return 해당 게시글과 연결된 첨부파일 정보를 담은 PostFileDto 객체의 목록
     */
    public List<PostFileDto> getPostFile(PostIdDto postIdDto) {
        return postFileRepository.getPostFile(postIdDto);
    }

    /**
     * <p>받은 파일 이름을 바이트 배열로 읽어오는 메서드</p>
     *
     * <p>1. 받은 파일의 이름을 이용해 실제 저장된 파일의 경로를 찾아 파일을 읽어옴</p>
     * <p>2. 파일이 존재하고 읽을 수 있으면 해당 파일의 내용을 바이트 배열로 반환</p>
     * <p>3. 파일이 존재하지 않거나 읽을 수 없을 경우 FileNotFoundException 또는 IOException 발생</p>
     *
     * @param fileName 다운로드할 파일의 이름
     * @return 파일의 내용을 담은 바이트 배열
     * @throws IOException 파일을 읽어오는 중 발생한 예외
     */
    public byte[] downloadFile(String fileName) throws IOException {
        String originalFileName = getOriginalFileName(fileName);

        try {
            Resource resource = new ClassPathResource("assets/" + originalFileName);

            if (!resource.exists() || !resource.isReadable()) {
                throw new FileNotFoundException("File not found or cannot be read: " + originalFileName);
            }

            return Files.readAllBytes(Paths.get(resource.getURI()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * <p>받은 파일 이름으로 확장자를 제외한 원본 파일 이름을 찾아 반환하는 메서드</p>
     *
     * <p>1. assets 폴더 내에서 주어진 파일 이름으로 시작하는 파일들을 검색</p>
     * <p>2. 검색된 파일 중에서 확장자를 제외한 원본 파일 이름을 찾아 반환</p>
     * <p>3. 검색된 파일이 없거나 확장자를 제외한 원본 파일 이름을 찾지 못한 경우 입력된 파일 이름 그대로 반환</p>
     *
     * @param fileName 찾을 파일의 이름
     * @return 검색된 파일이 있으면 fullFileName을 반환, 그렇지 않으면 확장자를 제외한 원본 파일 이름을 반환
     */
    public String getOriginalFileName(String fileName) {
        try {
            Resource resource = new ClassPathResource("assets/");
            Path uploadPath = Paths.get(resource.getURI());

            try (DirectoryStream<Path> stream = Files.newDirectoryStream(uploadPath, fileName + ".*")) {
                for (Path file : stream) {
                    String fullFileName = file.getFileName().toString();

                    // 파일명과 fileName이 일치하는 경우 파일의 전체 이름을 반환
                    if (deleteExtension(fullFileName).equals(fileName)) {
                        return fullFileName;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return fileName; // 일치하는 파일을 찾지 못한 경우 fileName 그대로 반환
    }

    /**
     * <p>파일명에서 확장자를 제외하는 메서드</p>
     *
     * <p>1. 파일명에서 마지막 점(.)의 인덱스를 찾아 확장자를 제외한 부분을 반환</p>
     *
     * @param fileName 확장자를 제외하고자 하는 파일명
     * @return 확장자를 제외한 파일명 반환
     */
    public String deleteExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex != -1) {
            return fileName.substring(0, lastDotIndex);
        }
        return fileName;
    }

    /**
     * <p>게시글 수정 시 연결된 첨부파일을 삭제하는 메서드</p>
     *
     * <p>1. 주어진 게시글 번호에 해당하는 첨부파일을 불러옴</p>
     * <p>2. 해당 번호를 가진 첨부파일의 uuid.확장자 이름을 파일 저장소에서 찾음</p>
     * <p>3. 해당 이름의 파일이 존재하면 파일 저장소에서 삭제</p>
     * <p>4. DB에서의 해당 파일 삭제 메서드 리턴</p>
     *
     * @param postIdDto) 삭제할 첨부파일이 연결된 게시글 번호 DTO.
     * @return 삭제 성공시 true, 실패시 false 반환
     */
    public boolean deletePostFile(PostIdDto postIdDto) {
        long postId = postIdDto.getPostId();
        try {
            List<PostFileDto> files = getPostFile(new PostIdDto(postId));

            for (PostFileDto file : files) {
                String fileName = file.getName() + "." + file.getExtension();
                String filePath = "assets/" + fileName;

                try {
                    Resource resource = new ClassPathResource(filePath);
                    Path path = Paths.get(resource.getURI());

                    if (Files.exists(path)) {
                        Files.delete(path);
                    } else {
                        System.out.println("File not found : " + fileName);
                    }
                } catch (IOException e) {
                    throw new RuntimeException("Failed to delete : " + fileName, e);
                }
            }
            return postFileRepository.deletePostFile(postIdDto);

        } catch (Exception e) {
            throw new RuntimeException("Failed to delete file and data for postId : " + postId, e);
        }
    }

    /**
     * <p>UUID처리된 파일의 원본 이름과 확장자를 가져오는 메서드</p>
     *
     * @param fileName UUID처리된 파일이름
     * @return 원본 파일이름과 확장자를 반환
     */
    public PostFileDto getOriginalName(String fileName) {
        return postFileRepository.getOriginalName(fileName);
    }
}



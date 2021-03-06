package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.auth.JwtUtil;
import clan.midnight.tortolla.dto.PostDTO;
import clan.midnight.tortolla.entity.PostPO;
import clan.midnight.tortolla.response.BaseResponse;
import clan.midnight.tortolla.response.FailedResponse;
import clan.midnight.tortolla.response.SuccessfulResponse;
import clan.midnight.tortolla.service.BloggerService;
import clan.midnight.tortolla.service.PostService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * @author Midnight1000
 */
@RestController
@RequestMapping("/posts")
public class PostController {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @Autowired
    private BloggerService bloggerService;

    @RequestMapping(value = "/{id}", method = GET, produces = "application/json")
    public BaseResponse getPost(@PathVariable long id) {
        PostDTO postDTO = postService.getById(id);
        if (postDTO == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND, "Cannot find post");
        }
        return new SuccessfulResponse<>(postDTO);
    }

    @RequestMapping(value = "/{id}", method = DELETE, produces = "application/json")
    public BaseResponse deletePost(@PathVariable long id) {
        boolean success = postService.deleteById(id);
        if (!success) {
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND, "Cannot delete post");
        }
        return new SuccessfulResponse<>(null);
    }

    @RequestMapping(value = "/list_top", method = GET, produces = "application/json")
    public BaseResponse listTop(Integer pageNum, Integer pageSize) {
        return new SuccessfulResponse<>(postService.getLatestIdByPage(pageNum, pageSize));
    }

    @RequestMapping(value = "/create", method = POST, produces = "application/json")
    public BaseResponse create(@RequestBody Map<String, Object> params) {
        String token = (String) params.get("token");
        Long authorId = JwtUtil.validUserToken(token);
        if (authorId == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED, "Invalid token");
        }
        String title = (String) params.get("title");
        String body = (String) params.get("body");
        if (postService.insert(new PostPO(title, body, authorId))) {
            return new SuccessfulResponse<>(null);
        } else {
            return new FailedResponse(FailedResponse.ERROR_CODE_CANNOT_NEW, "Fail on creation");
        }
    }

    @PostMapping("/upload_image")
    public Map<String, String> uploadImage(@RequestParam("upload") MultipartFile multipartFile) {
        log.info("uploading");
        Map<String, String> result = new HashMap<>(3);
        result.put("uploaded", "false");

        if (multipartFile == null || multipartFile.isEmpty()) {
            result.put("error", "Null or Empty!");
            return result;
        }

        String fileName = multipartFile.getOriginalFilename();
        if (fileName == null) {
            result.put("error", "Null file name!");
            return result;
        }
        String newFileName = UUID.randomUUID().toString()
                .replaceAll("-", "")
                .concat(fileName.substring(fileName.lastIndexOf(".")));

        String fullPath = "D:/upload/".concat(newFileName);

        try {
            File target = new File(fullPath);
            if (target.getParentFile().exists() || target.getParentFile().mkdirs()) {

                multipartFile.transferTo(target);
                String imgUrl = "/upload/".concat(newFileName);

                result.put("uploaded", "true");
                result.put("url", imgUrl);
            } else {
                log.error("Failed to create file: {}", target.getParentFile());
                result.put("error", "Failed to create file");
            }
        } catch (IOException ex) {
            log.error("Upload image failed", ex);
            result.put("error", "Unknown Error");
        }
        return result;
    }
}


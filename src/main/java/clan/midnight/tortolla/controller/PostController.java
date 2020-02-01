package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.auth.JWTUtil;
import clan.midnight.tortolla.entity.Post;
import clan.midnight.tortolla.response.BaseResponse;
import clan.midnight.tortolla.response.FailedResponse;
import clan.midnight.tortolla.response.SuccessfulResponse;
import clan.midnight.tortolla.service.BloggerService;
import clan.midnight.tortolla.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * @author Midnight1000
 */
@RestController
@RequestMapping("/posts")
@Slf4j
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private BloggerService bloggerService;

    @RequestMapping(value = "", method = GET, produces = "application/json")
    @ResponseBody
    public Post getPost(Long id) {
        return postService.findById(id);
    }

    @RequestMapping(value = "/list_top", method = GET, produces = "application/json")
    @ResponseBody
    public List<Long> listTop(Integer top) {
        return postService.findLatest(top);
    }

    @PostMapping(value = "/create")
    public BaseResponse create(@RequestBody Map<String, Object> params) {
        String token = (String) params.get("token");
        Long authorId = JWTUtil.validToken(token);
        if (authorId == null) {
            return new FailedResponse("003", "Invalid token");
        }
        String title = (String) params.get("title");
        String body = (String) params.get("body");
        if (postService.create(new Post(title, body, authorId))) {
            return new SuccessfulResponse<>(null);
        } else {
            return new FailedResponse("002", "Fail on creation");
        }
    }

    @PostMapping("/upload_image")
    @ResponseBody
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


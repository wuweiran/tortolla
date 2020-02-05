package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.dto.BloggerDTO;
import clan.midnight.tortolla.response.BaseResponse;
import clan.midnight.tortolla.response.FailedResponse;
import clan.midnight.tortolla.response.SuccessfulResponse;
import clan.midnight.tortolla.service.BloggerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author Midnight1000
 */
@RestController
@RequestMapping("/bloggers")
@Slf4j
public class BloggerController {

    @Autowired
    private BloggerService bloggerService;

    @PostMapping(value = "/login")
    public BaseResponse login(@RequestBody Map<String, Object> params) {
        BloggerDTO bloggerDTO = bloggerService.authenticate((String) params.get("username"), (String) params.get("password"));
        if (bloggerDTO == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        String token = bloggerService.createToken(bloggerDTO);
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/register")
    public BaseResponse register(@RequestBody Map<String, Object> params) {
        BloggerDTO bloggerDTO = bloggerService.register((String) params.get("username"),
                (String) params.get("password"), (String) params.get("realname"));
        if (bloggerDTO == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_CANNOT_NEW);
        }
        String token = bloggerService.createToken(bloggerDTO);
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/get_from_token")
    public BaseResponse getFromToken(@RequestBody Map<String, Object> params) {
        String token = (String) params.get("token");
        Long id = bloggerService.validateToken(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        BloggerDTO bloggerDTO = bloggerService.findById(id);
        if (bloggerDTO == null) {
            log.warn("verified user id, but not exist! id:{}", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(bloggerDTO);
    }

//    @PostMapping(value = "/update_avatar")
//    public BaseResponse updateAvatar(@RequestParam("upload") MultipartFile multipartFile) {
//        String token = (String) params.get("token");
//        Long id = JWTUtil.validToken(token);
//        if (id == null) {
//            return new FailedResponse("0001");
//        }
//        Blogger blogger = bloggerService.findById(id);
//        if (blogger == null) {
//            log.warn("verified user id, but not exist! id:{}", id);
//            return new FailedResponse("0001");
//        }
//        return new SuccessfulResponse<>(blogger);
//    }
}
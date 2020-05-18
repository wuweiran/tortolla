package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.dto.BloggerAuthorDTO;
import clan.midnight.tortolla.dto.BloggerRootDTO;
import clan.midnight.tortolla.response.BaseResponse;
import clan.midnight.tortolla.response.FailedResponse;
import clan.midnight.tortolla.response.SuccessfulResponse;
import clan.midnight.tortolla.service.BloggerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

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
        BloggerRootDTO bloggerRootDTO = bloggerService.authenticate((String) params.get("username"), (String) params.get("password"));
        if (bloggerRootDTO == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        String token = bloggerService.createToken(bloggerRootDTO);
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/register")
    public BaseResponse register(@RequestBody Map<String, Object> params) {
        BloggerRootDTO bloggerRootDTO = bloggerService.register((String) params.get("username"),
                (String) params.get("password"), (String) params.get("realName"));
        if (bloggerRootDTO == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_CANNOT_NEW);
        }
        String token = bloggerService.createToken(bloggerRootDTO);
        return new SuccessfulResponse<>(token);
    }

    @RequestMapping(value = "", method = GET, produces = "application/json")
    public BaseResponse getFromToken(@RequestParam(name = "token") String token) {
        if (token == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        Long id = bloggerService.validateToken(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        BloggerRootDTO bloggerRootDTO = bloggerService.findById(id);
        if (bloggerRootDTO == null) {
            log.warn("verified user id, but not exist! id:{}", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(bloggerRootDTO);
    }

    @RequestMapping(value = "/author", method = GET, produces = "application/json")
    public BaseResponse getAuthorById(Long id) {
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        BloggerAuthorDTO bloggerAuthorDTO = bloggerService.findAuthorById(id);
        if (bloggerAuthorDTO == null) {
            log.warn("Trying to fetch a non-existing author! id:{}", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(bloggerAuthorDTO);
    }
}
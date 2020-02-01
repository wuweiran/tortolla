package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.auth.JWTUtil;
import clan.midnight.tortolla.entity.Blogger;
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
        Long id = bloggerService.authenticate((String) params.get("username"), (String) params.get("password"));
        if (id == null) {
            return new FailedResponse("001");
        }
        String token = JWTUtil.createUserToken(id, 1000 * 60 * 10);
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/register")
    public BaseResponse register(@RequestBody Map<String, Object> params) {
        Long id = bloggerService.register((String) params.get("username"),
                (String) params.get("password"), (String) params.get("realname"));
        if (id == null) {
            return new FailedResponse("001");
        }
        String token = JWTUtil.createUserToken(id, 1000 * 60 * 10);
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/get_from_token")
    public BaseResponse getFromToken(@RequestBody Map<String, Object> params) {
        String token = (String) params.get("token");
        Long id = JWTUtil.validToken(token);
        if (id == null) {
            return new FailedResponse("0001");
        }
        Blogger blogger = bloggerService.findById(id);
        if (blogger == null) {
            log.warn("verified user id, but not exist! id:{}", id);
            return new FailedResponse("0001");
        }
        return new SuccessfulResponse<>(blogger);
    }
}
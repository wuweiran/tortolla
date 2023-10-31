package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.User;
import clan.midnight.tortolla.UserService;
import clan.midnight.tortolla.request.SignUpRequest;
import clan.midnight.tortolla.response.BaseResponse;
import clan.midnight.tortolla.response.FailedResponse;
import clan.midnight.tortolla.response.SuccessfulResponse;
import clan.midnight.tortolla.request.SignInRequest;
import clan.midnight.tortolla.response.UserWebDTO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class UserController {
    @Resource
    private UserService userService;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value = "/sign-in")
    public BaseResponse signIn(@ModelAttribute SignInRequest request) {
        String token = userService.authenticateAndGetToken(request.getUsername(), request.getPassword());
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/sign-up")
    public BaseResponse signUp(@ModelAttribute SignUpRequest request) {
        String token = userService.registerAndGetToken(request.getUsername(), request.getPassword(), request.getFullName());
        return new SuccessfulResponse<>(token);
    }

    @GetMapping(value = "/get-from-token")
    public BaseResponse getFromToken(@RequestHeader(name = "x-ms-user-token") String token) {
        if (token == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        Long id = userService.validateTokenAndGetUserId(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        User user = userService.getById(id);
        if (user == null) {
            log.warn("verified user id, but not exist! id:{}", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(UserWebDTO.fromDomain(user));
    }

    @GetMapping(value = "")
    public BaseResponse getById(@RequestHeader(name = "x-ms-user-token") String token) {
        if (token == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        Long id = userService.validateTokenAndGetUserId(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        User user = userService.getById(id);
        if (user == null) {
            log.warn("verified user id, but not exist! id:{}", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(UserWebDTO.fromDomain(user));
    }
}

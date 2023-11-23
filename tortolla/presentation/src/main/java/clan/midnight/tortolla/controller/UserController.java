package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.User;
import clan.midnight.tortolla.UserService;
import clan.midnight.tortolla.request.SignUpRequest;
import clan.midnight.tortolla.response.*;
import clan.midnight.tortolla.request.SignInRequest;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value = "/sign-in")
    public Response signIn(@ModelAttribute SignInRequest request) {
        String token = userService.authenticateAndGetToken(request.getUsername(), request.getPassword());
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/sign-up")
    public Response signUp(@ModelAttribute SignUpRequest request) {
        String token = userService.registerAndGetToken(request.getUsername(), request.getPassword(), request.getFullName());
        return new SuccessfulResponse<>(token);
    }

    @GetMapping(value = "/me")
    public Response getFromToken(@RequestHeader(name = "x-fd-user-token") String token) {
        if (token == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        Long id = userService.validateTokenAndGetUserId(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        User user = userService.getById(id);
        if (user == null) {
            log.warn("User ID {} doesn't exist.", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(UserWebDTO.fromDomain(user));
    }

    @GetMapping(value = "/{id}")
    public Response getById(@RequestHeader(name = "x-fd-user-token") String token, @PathVariable("id") Long id) {
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        if (token == null || userService.validateTokenAndGetUserId(token) == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        User user = userService.getById(id);
        if (user == null) {
            log.warn("User ID {} doesn't exist.", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(UserBasicWebDTO.fromDomain(user));
    }
}

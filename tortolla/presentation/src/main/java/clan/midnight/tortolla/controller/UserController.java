package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.User;
import clan.midnight.tortolla.UserRepository;
import clan.midnight.tortolla.UserService;
import clan.midnight.tortolla.request.SignInRequest;
import clan.midnight.tortolla.request.SignUpRequest;
import clan.midnight.tortolla.response.*;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {
    @Resource
    private UserService userService;

    @Resource
    private UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value = "/sign-in")
    public Response signIn(@RequestBody SignInRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        String token = userService.authenticateAndGetToken(request.getUsername(), request.getPassword());
        if (token == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/sign-up")
    public Response signUp(@RequestBody SignUpRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        if (request.getFullName() == null || request.getFullName().isEmpty()) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        String token = userService.registerAndGetToken(request.getUsername(), request.getPassword(), request.getFullName());
        if (token == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_CANNOT_NEW);
        }
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
        User user = userRepository.getById(id);
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
        User user = userRepository.getById(id);
        if (user == null) {
            log.warn("User ID {} doesn't exist.", id);
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND);
        }
        return new SuccessfulResponse<>(UserBasicWebDTO.fromDomain(user));
    }
}

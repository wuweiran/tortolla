package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.User;
import clan.midnight.tortolla.repository.UserRepository;
import clan.midnight.tortolla.request.SignInRequest;
import clan.midnight.tortolla.request.SignUpRequest;
import clan.midnight.tortolla.response.*;
import clan.midnight.tortolla.service.UserService;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:5173", "https://zealous-flower-07b62ba00.4.azurestaticapps.net"})
public class UserController {
    @Resource
    private UserService userService;

    @Resource
    private UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value = "/sign-in")
    public Response signIn(@RequestBody SignInRequest request) {
        if (request.username() == null || request.username().isEmpty()) {
            return new FailedResponse(FailedResponse.ErrorCode.INVALID_ARGUMENT);
        }
        String token = userService.authenticateAndGetToken(request.username(), request.password());
        if (token == null) {
            return new FailedResponse(FailedResponse.ErrorCode.UNAUTHENTICATED);
        }
        return new SuccessfulResponse<>(token);
    }

    @PostMapping(value = "/sign-up")
    public Response signUp(@RequestBody SignUpRequest request) {
        if (request.username() == null || request.username().isEmpty()) {
            return new FailedResponse(FailedResponse.ErrorCode.INVALID_ARGUMENT);
        }
        if (request.password() == null || request.password().isEmpty()) {
            return new FailedResponse(FailedResponse.ErrorCode.INVALID_ARGUMENT);
        }
        if (request.fullName() == null || request.fullName().isEmpty()) {
            return new FailedResponse(FailedResponse.ErrorCode.INVALID_ARGUMENT);
        }
        String token = userService.registerAndGetToken(request.username(), request.password(), request.fullName());
        if (token == null) {
            return new FailedResponse(FailedResponse.ErrorCode.ALREADY_EXISTS);
        }
        return new SuccessfulResponse<>(token);
    }

    @GetMapping(value = "/me")
    public Response getFromToken(@RequestHeader(name = "x-fd-user-token") String token) {
        if (token == null) {
            return new FailedResponse(FailedResponse.ErrorCode.UNAUTHENTICATED);
        }
        Long id = userService.validateTokenAndGetUserId(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ErrorCode.UNAUTHENTICATED);
        }
        User user = userRepository.getById(id);
        if (user == null) {
            log.warn("User ID {} doesn't exist.", id);
            return new FailedResponse(FailedResponse.ErrorCode.NOT_FOUND);
        }
        return new SuccessfulResponse<>(UserWebDTO.fromDomain(user));
    }

    @GetMapping(value = "/{id}")
    public Response getById(@RequestHeader(name = "x-fd-user-token") String token, @PathVariable("id") Long id) {
        if (id == null) {
            return new FailedResponse(FailedResponse.ErrorCode.INVALID_ARGUMENT);
        }
        if (token == null || userService.validateTokenAndGetUserId(token) == null) {
            return new FailedResponse(FailedResponse.ErrorCode.UNAUTHENTICATED);
        }
        User user = userRepository.getById(id);
        if (user == null) {
            log.warn("User ID {} doesn't exist.", id);
            return new FailedResponse(FailedResponse.ErrorCode.NOT_FOUND);
        }
        return new SuccessfulResponse<>(UserBasicWebDTO.fromDomain(user));
    }
}

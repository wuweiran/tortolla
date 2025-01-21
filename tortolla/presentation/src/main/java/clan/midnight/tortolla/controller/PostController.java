package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.Post;
import clan.midnight.tortolla.User;
import clan.midnight.tortolla.repository.PostRepository;
import clan.midnight.tortolla.repository.UserRepository;
import clan.midnight.tortolla.request.CreatePostRequest;
import clan.midnight.tortolla.request.DeletePostRequest;
import clan.midnight.tortolla.response.*;
import clan.midnight.tortolla.service.UserService;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = {"http://localhost:5173", "https://zealous-flower-07b62ba00.4.azurestaticapps.net"})
public class PostController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Resource
    private PostRepository postRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private UserService userService;

    @GetMapping(value = "/{id}")
    public Response getPost(@PathVariable Long id) {
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        Post post = postRepository.getById(id);
        if (post == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND, "Cannot find post");
        }
        return new SuccessfulResponse<>(PostWebDTO.fromDomain(post, post.getAuthor(userRepository)));
    }


    @PostMapping(value = "/delete")
    public Response deletePost(@RequestBody DeletePostRequest request, @RequestHeader(name = "x-fd-user-token") String token) {
        if (request.postId() == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        Post post = postRepository.getById(request.postId());
        if (post == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_NOT_FOUND, "Cannot find post");
        }
        Long id = userService.validateTokenAndGetUserId(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        User user = userRepository.getById(id);
        if (user == null || !post.isPostedBy(user)) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        postRepository.removeById(request.postId());
        return new SuccessfulResponse<>();
    }

    @PostMapping(value = "/create")
    public Response createPost(@RequestBody CreatePostRequest request, @RequestHeader(name = "x-fd-user-token") String token) {
        if (request.title() == null || request.title().isBlank()) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        if (request.body() == null || request.body().isBlank()) {
            return new FailedResponse(FailedResponse.ERROR_CODE_WRONG_PARAM);
        }
        Long id = userService.validateTokenAndGetUserId(token);
        if (id == null) {
            return new FailedResponse(FailedResponse.ERROR_CODE_UNAUTHORIZED);
        }
        long postId = postRepository.put(request.title(), request.body(), id);
        return new SuccessfulResponse<>(postId);
    }

    @GetMapping(value = "/latest")
    public Response listLatestPosts(@RequestParam Integer pageNumber, @RequestParam Integer pageSize) {
        if (pageNumber == null) {
            pageNumber = 0;
        }
        if (pageSize == null) {
            pageSize = 20;
        }
        List<Post> posts = postRepository.listLatest(pageNumber, pageSize);
        List<PostPreviewWebDTO> result = posts.stream().map(post -> PostPreviewWebDTO.fromDomain(post, post.getAuthor(userRepository))).toList();
        return new SuccessfulResponse<>(result);
    }
}

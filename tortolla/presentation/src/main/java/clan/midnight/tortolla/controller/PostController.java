package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.Post;
import clan.midnight.tortolla.PostRepository;
import clan.midnight.tortolla.UserRepository;
import clan.midnight.tortolla.response.FailedResponse;
import clan.midnight.tortolla.response.PostWebDTO;
import clan.midnight.tortolla.response.Response;
import clan.midnight.tortolla.response.SuccessfulResponse;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Resource
    private PostRepository postRepository;

    @Resource
    private UserRepository userRepository;

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

    @GetMapping(value = "")
    public Response getPosts(@RequestParam Long offset, @RequestParam Long limit) {
        if (offset == null) {
            offset = 0L;
        }
        if (limit == null) {
            limit = 20L;
        }
        List<Post> posts = postRepository.list(offset, limit);
        List<PostWebDTO> result = posts.stream().map(post -> PostWebDTO.fromDomain(post, post.getAuthor(userRepository))).toList();
        return new SuccessfulResponse<>(result);
    }
}

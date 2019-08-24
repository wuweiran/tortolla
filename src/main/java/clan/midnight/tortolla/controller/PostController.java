package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.dto.PostForm;
import clan.midnight.tortolla.model.Post;
import clan.midnight.tortolla.service.BloggerService;
import clan.midnight.tortolla.service.NotificationService;
import clan.midnight.tortolla.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
/**
 * @author Midnight1000
 */
@Controller
@RequestMapping("/posts")
public class PostController {
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @Autowired
    private BloggerService bloggerService;

    @Autowired
    private NotificationService notifyService;

    @RequestMapping("/view/{id}")
    public String view(@PathVariable("id") Long id, Model model) {
        Post post = postService.findById(id);
        if (post == null) {
            notifyService.addErrorMessage("Cannot find post #" + id);
            return "redirect:/";
        }
        model.addAttribute("post", post);
        return "posts/view";
    }

    @RequestMapping("/create")
    public String create(PostForm postForm) {
        return "posts/create";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String create(@Valid PostForm postForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            notifyService.addErrorMessage("Please fill the form correctly!");
            return "posts/create";
        }

        Post post = new Post(postForm.getTitle(), postForm.getBody(), bloggerService.getCurrentBlogger().getId());

        if (!postService.create(post)) {
            notifyService.addErrorMessage("Post failed!");
            return "posts/create";
        }

        notifyService.addInfoMessage("Post Successful!");
        return "redirect:/";
    }

    @RequestMapping("")
    public String index(Model model) {
        List<Post> latest5Posts = postService.findLatest(5);
        model.addAttribute("posts", latest5Posts);
        return "posts/index";
    }

    @PostMapping("/uploadImage")
    @ResponseBody
    public Map<String, String> uploadImage(@RequestParam("upload") MultipartFile multipartFile) {
        System.err.println("123123");
        Map<String, String> result = new HashMap<String, String>(3);
        result.put("uploaded", "false");

        if (multipartFile == null || multipartFile.isEmpty()) {
            result.put("error", "Null or Empty!");
            return result;
        }

        String fileName = multipartFile.getOriginalFilename();
        String newFileName = UUID.randomUUID().toString()
                .replaceAll("-", "")
                .concat(fileName.substring(fileName.lastIndexOf(".")));

        String fullPath = "D:/upload/".concat(newFileName);

        try {
            File target = new File(fullPath);
            if (!target.getParentFile().exists()) {
                target.getParentFile().mkdirs();
            }

            multipartFile.transferTo(target);
            String imgUrl = "/upload/".concat(newFileName);

            result.put("uploaded", "true");
            result.put("url", imgUrl);
        } catch (IOException ex) {
            logger.error("Upload image failed", ex);
            result.put("error", "Unknown Error");
        }
        return result;
    }
}


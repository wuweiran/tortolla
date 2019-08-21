package clan.midnight.tortolla.controllers;

import clan.midnight.tortolla.forms.PostForm;
import clan.midnight.tortolla.models.Post;
import clan.midnight.tortolla.services.BloggerService;
import clan.midnight.tortolla.services.NotificationService;
import clan.midnight.tortolla.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Midnight1000
 */
@Controller
@RequestMapping("/posts")
public class PostController {
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
        List<Post> latest5Posts = postService.findLatest5();
        model.addAttribute("posts", latest5Posts);
        return "posts/index";
    }
}


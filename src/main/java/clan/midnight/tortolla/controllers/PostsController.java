package clan.midnight.tortolla.controllers;

import clan.midnight.tortolla.models.Post;
import clan.midnight.tortolla.services.NotificationService;
import clan.midnight.tortolla.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * @author Midnight1000
 */
@Controller
@RequestMapping("/posts")
public class PostsController {
    @Autowired
    private PostService postService;

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

    @RequestMapping("")
    public String index(Model model) {
        List<Post> latest5Posts = postService.findLatest5();
        model.addAttribute("posts", latest5Posts);
        return "posts/index";
    }
}


package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.model.Post;
import clan.midnight.tortolla.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * @author Midnight1000 (wuweiran)
 */
@Controller
public class InnController {
    @Autowired
    private PostService postService;

    @RequestMapping("/")
    public String index(Model model) {
        List<Post> latest5Posts = postService.findLatest(10);
        model.addAttribute("recentPosts", latest5Posts);

        List<Post> latest3Posts = postService.findLatest(3);
        model.addAttribute("latest3posts", latest3Posts);

        return "index";
    }
}

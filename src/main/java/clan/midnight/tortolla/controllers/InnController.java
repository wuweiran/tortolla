package clan.midnight.tortolla.controllers;

import clan.midnight.tortolla.models.Post;
import clan.midnight.tortolla.services.PostService;
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
        List<Post> latest5Posts = postService.findLatest5();
        model.addAttribute("latest5posts", latest5Posts);

        List<Post> latest3Posts = postService.findLatest3();
        model.addAttribute("latest3posts", latest3Posts);

        return "index";
    }
}

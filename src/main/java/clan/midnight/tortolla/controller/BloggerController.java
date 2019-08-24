package clan.midnight.tortolla.controller;

import clan.midnight.tortolla.dto.LoginForm;
import clan.midnight.tortolla.dto.RegisterForm;
import clan.midnight.tortolla.model.Blogger;
import clan.midnight.tortolla.service.BloggerService;
import clan.midnight.tortolla.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

/**
 * @author Midnight1000
 */
@Controller
@RequestMapping("/bloggers")
public class BloggerController {

    @Autowired
    private BloggerService bloggerService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping("/login")
    public String login(LoginForm loginForm) {
        return "bloggers/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginPage(@Valid LoginForm loginForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            notificationService.addErrorMessage("Please fill the form correctly!");
            return "bloggers/login";
        }

        if (!bloggerService.authenticate(
                loginForm.getUsername(), loginForm.getPassword())) {
            notificationService.addErrorMessage("Invalid login!");
            return "bloggers/login";
        }

        notificationService.addInfoMessage("Login successful");
        return "redirect:/";
    }

    @RequestMapping("/register")
    public String register(RegisterForm registerForm) {
        return "bloggers/register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerPage(@Valid RegisterForm registerForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            notificationService.addErrorMessage("Please fill the form correctly!");
            return "bloggers/register";
        }

        if (!bloggerService.register(
                registerForm.getUsername(), registerForm.getPassword(), registerForm.getFullName())) {
            notificationService.addErrorMessage("Invalid registration!");
            return "bloggers/register";
        }

        notificationService.addInfoMessage("Registration successful");
        return "redirect:/";
    }

    @RequestMapping("/view/{id}")
    public String view(@PathVariable("id") Long id, Model model) {
        Blogger blogger = bloggerService.findById(id);
        if (blogger == null) {
            notificationService.addErrorMessage("Cannot find blogger #" + id);
            return "redirect:/";
        }
        model.addAttribute("blogger", blogger);
        return "bloggers/view";
    }
}
package clan.midnight.tortolla.controllers;

import clan.midnight.tortolla.forms.LoginForm;
import clan.midnight.tortolla.forms.RegisterForm;
import clan.midnight.tortolla.services.BloggerService;
import clan.midnight.tortolla.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
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
}
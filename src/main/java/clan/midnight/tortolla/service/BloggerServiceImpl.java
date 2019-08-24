package clan.midnight.tortolla.service;

import clan.midnight.tortolla.dao.BloggerMapper;
import clan.midnight.tortolla.model.Blogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Objects;

/**
 * @author Midnight1000
 */
@Service
public class BloggerServiceImpl implements BloggerService {
    @Autowired
    private BloggerMapper bloggerMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean authenticate(@NotNull String username, @NotNull String password) {
        return Objects.nonNull(bloggerMapper.getId(username, password));
    }

    @Override
    public boolean register(@NotNull String username, @NotNull String password, String fullName) {
        Blogger blogger = new Blogger(username, passwordEncoder.encode(password), fullName);
        blogger.setCreatedTime(new Date());
        return bloggerMapper.insert(blogger) > 0;
    }

    @Override
    public Blogger getCurrentBlogger() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return bloggerMapper.findByName(authentication.getName());
        }
        return null;
    }

    @Override
    public Blogger findById(Long id) {
        return bloggerMapper.findById(id);
    }
}

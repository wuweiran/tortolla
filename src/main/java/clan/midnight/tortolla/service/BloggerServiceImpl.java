package clan.midnight.tortolla.service;

import clan.midnight.tortolla.auth.PasswordEncoder;
import clan.midnight.tortolla.dao.BloggerMapper;
import clan.midnight.tortolla.entity.Blogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * @author Midnight1000
 */
@Service
public class BloggerServiceImpl implements BloggerService {
    @Autowired
    private BloggerMapper bloggerMapper;

    @Override
    public Long authenticate(@NotNull String username, @NotNull String password) {
        return bloggerMapper.getId(username, PasswordEncoder.encode(password));
    }

    @Override
    public Long register(@NotNull String username, @NotNull String password, String fullName) {
        String encodedPassword = PasswordEncoder.encode(password);
        Blogger blogger = new Blogger(username, encodedPassword, fullName);
        blogger.setCreatedTime(new Date());
        if (bloggerMapper.insert(blogger) > 0) {
            return bloggerMapper.getId(username, encodedPassword);
        }
        return null;
    }

    @Override
    public Blogger findById(Long id) {
        return bloggerMapper.findById(id);
    }

    /**
     * Get the blogger by name
     *
     * @param name of the blogger
     * @return blogger DO
     */
    @Override
    public Blogger findByName(String name) {
        return bloggerMapper.findByName(name);
    }
}

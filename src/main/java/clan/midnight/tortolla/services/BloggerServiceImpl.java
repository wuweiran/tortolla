package clan.midnight.tortolla.services;

import clan.midnight.tortolla.mappers.BloggerMapper;
import clan.midnight.tortolla.models.Blogger;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public boolean authenticate(@NotNull String username, @NotNull String password) {
        return Objects.nonNull(bloggerMapper.getId(username, password));
    }

    @Override
    public boolean register(@NotNull String username, @NotNull String password, String fullName) {
        Blogger blogger = new Blogger(username, password, fullName);
        blogger.setCreatedTime(new Date());
        return bloggerMapper.insert(blogger) > 0;
    }
}

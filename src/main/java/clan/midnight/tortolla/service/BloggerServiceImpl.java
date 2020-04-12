package clan.midnight.tortolla.service;

import clan.midnight.tortolla.auth.JWTUtil;
import clan.midnight.tortolla.auth.PasswordEncoder;
import clan.midnight.tortolla.dao.BloggerMapper;
import clan.midnight.tortolla.dto.BloggerAuthorDTO;
import clan.midnight.tortolla.dto.BloggerRootDTO;
import clan.midnight.tortolla.entity.BloggerPO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

/**
 * @author Midnight1000
 */
@Service
public class BloggerServiceImpl implements BloggerService {
    @Autowired
    private BloggerMapper bloggerMapper;

    @Override
    public BloggerRootDTO authenticate(@NotNull String username, @NotNull String password) {
        return new BloggerRootDTO(bloggerMapper.authenticateAndGet(username, PasswordEncoder.encode(password)));
    }

    @Override
    public BloggerRootDTO register(@NotNull String username, @NotNull String password, String fullName) {
        String encodedPassword = PasswordEncoder.encode(password);
        BloggerPO bloggerPO = new BloggerPO(username, encodedPassword, fullName);
        if (bloggerMapper.insert(bloggerPO) > 0) {
            return new BloggerRootDTO(bloggerMapper.getByName(username));
        }
        return null;
    }

    @Override
    public BloggerRootDTO findById(Long id) {
        return new BloggerRootDTO(bloggerMapper.getById(id));
    }

    @Override
    public BloggerRootDTO findByName(String name) {
        return new BloggerRootDTO(bloggerMapper.getByName(name));
    }

    @Override
    public Long validateToken(String token) {
        return JWTUtil.validUserToken(token);
    }

    @Override
    public String createToken(BloggerRootDTO bloggerRootDTO) {
        return JWTUtil.createUserToken(bloggerRootDTO.getId(), 1000 * 60 * 10);
    }

    @Override
    public BloggerAuthorDTO findAuthorById(Long id) {
        return new BloggerAuthorDTO(bloggerMapper.getById(id));
    }
}

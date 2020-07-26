package clan.midnight.tortolla.service;

import clan.midnight.tortolla.auth.JwtUtil;
import clan.midnight.tortolla.auth.PasswordEncoder;
import clan.midnight.tortolla.dao.BloggerMapper;
import clan.midnight.tortolla.dto.BloggerAuthorDTO;
import clan.midnight.tortolla.dto.BloggerRootDTO;
import clan.midnight.tortolla.entity.BloggerPO;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Midnight1000
 */
@Service
public class BloggerServiceImpl implements BloggerService {
    @Autowired
    private BloggerMapper bloggerMapper;

    @Override
    public BloggerRootDTO authenticate(@NonNull String username, @NonNull String password) {
        BloggerPO bloggerPO = bloggerMapper.authenticateAndGet(username, PasswordEncoder.encode(password));
        if (bloggerPO == null) {
            return null;
        } else {
            return new BloggerRootDTO(bloggerPO);
        }
    }

    @Override
    public BloggerRootDTO register(@NonNull String username, @NonNull String password, String fullName) {
        String encodedPassword = PasswordEncoder.encode(password);
        BloggerPO bloggerPO = new BloggerPO(username, encodedPassword, fullName);
        if (bloggerMapper.insert(bloggerPO) > 0) {
            return new BloggerRootDTO(bloggerMapper.getByName(username));
        }
        return null;
    }

    @Override
    public BloggerRootDTO getById(Long id) {
        return new BloggerRootDTO(bloggerMapper.getById(id));
    }

    @Override
    public BloggerRootDTO getByName(String name) {
        return new BloggerRootDTO(bloggerMapper.getByName(name));
    }

    @Override
    public Long validateToken(String token) {
        return JwtUtil.validUserToken(token);
    }

    @Override
    public String createToken(BloggerRootDTO bloggerRootDTO) {
        return JwtUtil.createUserToken(bloggerRootDTO.getId(), 1000 * 60 * 10);
    }

    @Override
    public BloggerAuthorDTO getAuthorById(Long id) {
        return new BloggerAuthorDTO(bloggerMapper.getById(id));
    }
}

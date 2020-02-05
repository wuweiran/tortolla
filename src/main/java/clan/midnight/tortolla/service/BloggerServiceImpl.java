package clan.midnight.tortolla.service;

import clan.midnight.tortolla.auth.JWTUtil;
import clan.midnight.tortolla.auth.PasswordEncoder;
import clan.midnight.tortolla.dao.BloggerMapper;
import clan.midnight.tortolla.dto.BloggerDTO;
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
    public BloggerDTO authenticate(@NotNull String username, @NotNull String password) {
        return new BloggerDTO(bloggerMapper.authenticateAndGet(username, PasswordEncoder.encode(password)));
    }

    @Override
    public BloggerDTO register(@NotNull String username, @NotNull String password, String fullName) {
        String encodedPassword = PasswordEncoder.encode(password);
        BloggerPO bloggerPO = new BloggerPO(username, encodedPassword, fullName);
        if (bloggerMapper.insert(bloggerPO) > 0) {
            return new BloggerDTO(bloggerMapper.getByName(username));
        }
        return null;
    }

    @Override
    public BloggerDTO findById(Long id) {
        return new BloggerDTO(bloggerMapper.getById(id));
    }

    @Override
    public BloggerDTO findByName(String name) {
        return new BloggerDTO(bloggerMapper.getByName(name));
    }

    @Override
    public Long validateToken(String token) {
        return JWTUtil.validUserToken(token);
    }

    @Override
    public String createToken(BloggerDTO bloggerDTO) {
        return JWTUtil.createUserToken(bloggerDTO.getId(), 1000 * 60 * 10);
    }
}

package clan.midnight.tortolla.service;

import clan.midnight.tortolla.dao.PostMapper;
import clan.midnight.tortolla.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * @author Midnight1000 (wuweiran)
 */
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostMapper postMapper;

    @Override
    public List<Post> findByAuthorId(@NotNull Long authorId) {
        return postMapper.findByBloggerId(authorId);
    }

    @Override
    public List<Long> findLatest(int num) {
        return postMapper.findLatest(num);
    }

    @Override
    public Post findById(@NotNull Long id) {
        return postMapper.findById(id);
    }

    @Override
    public boolean create(@NotNull Post post) {
        post.setCreatedTime(new Date());
        post.setLastModifiedTime(new Date());
        return postMapper.insert(post) > 0;
    }

    @Override
    public boolean edit(@NotNull Post post) {
        post.setLastModifiedTime(new Date());
        return postMapper.update(post) > 0;
    }

    @Override
    public boolean deleteById(@NotNull Long id) {
        return postMapper.delete(id) > 0;
    }
}

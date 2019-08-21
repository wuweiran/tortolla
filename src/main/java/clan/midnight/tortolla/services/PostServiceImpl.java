package clan.midnight.tortolla.services;

import clan.midnight.tortolla.mappers.PostMapper;
import clan.midnight.tortolla.models.Blogger;
import clan.midnight.tortolla.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * @author Midnight1000 (wuweiran)
 */
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostMapper postMapper;

    @Override
    public List<Post> findByBlogger(@NotNull Blogger blogger) {
        return postMapper.findByBloggerId(blogger.getId());
    }

    @Override
    public List<Post> findLatest5() {
        return postMapper.findLatest(5);
    }

    @Override
    public List<Post> findLatest3() {
        return postMapper.findLatest(3);
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
    public Post edit(@NotNull Post post) {
        post.setLastModifiedTime(new Date());
        postMapper.update(post);
        Post editedPost = postMapper.findById(post.getId());
        if (Objects.equals(post, editedPost)) {
            throw new RuntimeException("Editing error");
        }
        return editedPost;
    }

    @Override
    public boolean deleteById(@NotNull Long id) {
        return postMapper.delete(id) > 0;
    }
}

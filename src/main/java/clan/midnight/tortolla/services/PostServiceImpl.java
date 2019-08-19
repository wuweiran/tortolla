package clan.midnight.tortolla.services;

import clan.midnight.tortolla.mappers.PostMapper;
import clan.midnight.tortolla.models.Blogger;
import clan.midnight.tortolla.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @author Midnight1000 (wuweiran)
 */
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostMapper postMapper;

    /*
    private List<Post> posts = new ArrayList<Post>() {{
        add(new Post(1L, "First Post", "<p>Line #1.</p><p>Line #2</p>", null));
        add(new Post(2L, "Second Post",
                "Second post content:<ul><li>line 1</li><li>line 2</li></p>",
                new Blogger(10L, "pesho10", "Peter Ivanov")));
        add(new Post(3L, "Post #3", "<p>The post number 3 nice</p>",
                new Blogger(10L, "merry", null)));
        add(new Post(4L, "Forth Post", "<p>Not interesting post</p>", null));
        add(new Post(5L, "Post Number 5", "<p>Just posting</p>", null));
        add(new Post(6L, "Sixth Post", "<p>Another interesting post</p>", null));
    }};*/

    @Override
    public List<Post> findByBlogger(@NotNull Blogger blogger) {
        return postMapper.findByBlogger(blogger.getId());
    }

    @Override
    public List<Post> findLatest5() {
        return postMapper.findLatest(5);
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

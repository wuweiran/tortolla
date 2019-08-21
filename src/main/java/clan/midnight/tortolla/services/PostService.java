package clan.midnight.tortolla.services;

import clan.midnight.tortolla.models.Blogger;
import clan.midnight.tortolla.models.Post;

import java.util.List;

/**
 * @author Midnight1000
 */
public interface PostService {

    List<Post> findLatest5();

    List<Post> findLatest3();

    List<Post> findByBlogger(Blogger blogger);

    Post findById(Long id);

    boolean create(Post post);

    Post edit(Post post);

    boolean deleteById(Long id);

}

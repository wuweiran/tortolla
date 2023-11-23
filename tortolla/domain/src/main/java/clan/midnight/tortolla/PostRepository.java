package clan.midnight.tortolla;

import clan.midnight.tortolla.Post;

import java.util.List;

public interface PostRepository {
    Post getById(long id);

    List<Post> list(long offset, long limit);
}

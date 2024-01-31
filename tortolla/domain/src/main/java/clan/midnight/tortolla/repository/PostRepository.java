package clan.midnight.tortolla.repository;

import clan.midnight.tortolla.Post;

import java.util.List;

public interface PostRepository {
    Post getById(long id);

    List<Post> listLatest(int pageNumber, int pageSize);

    long put(String title, String body, long authorId);

    void removeById(long id);
}

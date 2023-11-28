package clan.midnight.tortolla;

import java.util.List;

public interface PostRepository {
    Post getById(long id);

    List<Post> list(int pageNumber, int pageSize);
}

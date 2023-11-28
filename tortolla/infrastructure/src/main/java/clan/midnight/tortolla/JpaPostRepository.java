package clan.midnight.tortolla;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JpaPostRepository implements PostRepository {
    @Autowired
    private PostJpaRepository jpaRepository;

    @Override
    public Post getById(long id) {
        return jpaRepository.findById(id).map(po -> new Post(po.getId(), po.getTitle(), po.getBody(), po.getAuthorId(), po.getCreatedTime(), po.getLastUpdatedTime())).orElse(null);
    }

    @Override
    public List<Post> list(int pageNumber, int pageSize) {
        return jpaRepository
                .findAll(PageRequest.of(pageNumber, pageSize))
                .map(po -> new Post(po.getId(), po.getTitle(), po.getBody(), po.getAuthorId(), po.getCreatedTime(), po.getLastUpdatedTime()))
                .stream().toList();
    }
}

package clan.midnight.tortolla.repository;

import clan.midnight.tortolla.Post;
import clan.midnight.tortolla.persist.PostPO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public List<Post> listLatest(int pageNumber, int pageSize) {
        return jpaRepository
                .findAll(PageRequest.of(pageNumber, pageSize).withSort(Sort.by("createdTime").descending()))
                .map(po -> new Post(po.getId(), po.getTitle(), po.getBody(), po.getAuthorId(), po.getCreatedTime(), po.getLastUpdatedTime()))
                .toList();
    }

    @Override
    public long put(String title, String body, long authorId) {
        PostPO po = jpaRepository.saveAndFlush(new PostPO(null, title, body, authorId, null, null));
        return po.getId();
    }

    @Override
    public void removeById(long id) {
        jpaRepository.deleteById(id);
    }
}

package clan.midnight.tortolla.service;

import clan.midnight.tortolla.dao.PostMapper;
import clan.midnight.tortolla.entity.PostPO;
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
    public List<PostPO> findByAuthorId(@NotNull Long authorId) {
        return postMapper.findByBloggerId(authorId);
    }

    @Override
    public List<Long> findLatest(int num) {
        return postMapper.findLatest(num);
    }

    @Override
    public PostPO findById(@NotNull Long id) {
        return postMapper.findById(id);
    }

    @Override
    public boolean create(@NotNull PostPO postPO) {
        postPO.setCreatedTime(new Date());
        postPO.setLastModifiedTime(new Date());
        return postMapper.insert(postPO) > 0;
    }

    @Override
    public boolean edit(@NotNull PostPO postPO) {
        postPO.setLastModifiedTime(new Date());
        return postMapper.update(postPO) > 0;
    }

    @Override
    public boolean deleteById(@NotNull Long id) {
        return postMapper.delete(id) > 0;
    }
}

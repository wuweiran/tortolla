package clan.midnight.tortolla.service;

import clan.midnight.tortolla.dao.PostMapper;
import clan.midnight.tortolla.dto.PostDTO;
import clan.midnight.tortolla.entity.PostPO;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Midnight1000 (wuweiran)
 */
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostMapper postMapper;

    @Override
    public List<PostDTO> findByAuthorId(@NonNull Long authorId) {
        return postMapper.findByBloggerId(authorId).stream()
                .map(PostDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<Long> getLatestId(int num) {
        return postMapper.getLatestId(num);
    }

    @Override
    public PageInfo<Long> getLatestIdByPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Long> list = postMapper.getLatestId();
        return new PageInfo<>(list);
    }

    @Override
    public PostDTO findById(@NonNull Long id) {
        PostPO postPO = postMapper.findById(id);
        if (postPO == null) {
            return null;
        }
        return new PostDTO(postMapper.findById(id));
    }

    @Override
    public boolean create(@NonNull PostPO postPO) {
        postPO.setCreatedTime(new Date());
        postPO.setLastModifiedTime(new Date());
        return postMapper.insert(postPO) > 0;
    }

    @Override
    public boolean edit(@NonNull PostPO postPO) {
        postPO.setLastModifiedTime(new Date());
        return postMapper.update(postPO) > 0;
    }

    @Override
    public boolean deleteById(@NonNull Long id) {
        return postMapper.delete(id) > 0;
    }
}

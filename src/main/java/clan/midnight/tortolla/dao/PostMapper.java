package clan.midnight.tortolla.dao;

import clan.midnight.tortolla.entity.PostPO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Post DAO
 *
 * @author Midnight1000 (wuweiran)
 */
@Mapper
public interface PostMapper {

    /**
     * Get latest posts by number
     *
     * @param num Number of latest posts
     * @return List of posts
     */
    List<Long> getLatestId(int num);

    /**
     * Get list of latest posts IDs
     *
     * @return List of posts
     */
    List<Long> getLatestId();

    /**
     * Get posts of a blogger
     *
     * @param id Id of the blogger
     * @return List of posts
     */
    List<PostPO> findByBloggerId(long id);

    /**
     * Get the instance of a post
     *
     * @param id ID of the post
     * @return Instance of post
     */
    PostPO findById(Long id);

    /**
     * Insert instance of the post
     *
     * @param post Instance of post
     * @return Mybatis return value of CRUD
     */
    int insert(PostPO post);

    /**
     * Update a post
     *
     * @param post Instance of the post
     * @return Mybatis return value of CRUD
     */
    int update(PostPO post);

    /**
     * Delete a post by ID
     *
     * @param id ID of the post
     * @return Mybatis return value of CRUD
     */
    int delete(Long id);
}

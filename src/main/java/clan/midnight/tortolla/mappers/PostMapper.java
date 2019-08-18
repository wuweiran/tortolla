package clan.midnight.tortolla.mappers;

import clan.midnight.tortolla.models.Blogger;
import clan.midnight.tortolla.models.Post;
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
    List<Post> findLatest(int num);

    /**
     * Get posts of a blogger
     *
     * @param id Id of the blogger
     * @return List of posts
     */
    List<Post> findByBlogger(long id);

    /**
     * Get the instance of a post
     *
     * @param id ID of the post
     * @return Instance of post
     */
    Post findById(Long id);

    /**
     * Insert instance of the post
     *
     * @param post Instance of post
     * @return Mybatis return value of CRUD
     */
    int insert(Post post);

    /**
     * Update a post
     *
     * @param post Instance of the post
     * @return Mybatis return value of CRUD
     */
    int update(Post post);

    /**
     * Delete a post by ID
     *
     * @param id ID of the post
     * @return Mybatis return value of CRUD
     */
    int delete(Long id);
}

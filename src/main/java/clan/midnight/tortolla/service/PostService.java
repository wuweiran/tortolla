package clan.midnight.tortolla.service;

import clan.midnight.tortolla.dto.PostDTO;
import clan.midnight.tortolla.entity.PostPO;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * @author Midnight1000
 */
public interface PostService {

    /**
     * Find a certain number of posts.
     *
     * @param num number of posts to find
     * @return list of posts found
     */
    List<Long> listLatestIds(int num);

    /**
     * Find a certain number of posts by page.
     *
     * @param pageNum  number of page
     * @param pageSize number of records in one page
     * @return list of posts found
     */
    PageInfo<Long> getLatestIdByPage(int pageNum, int pageSize);

    /**
     * Find posts of a blogger by blogger's ID.
     *
     * @param authorId id of the author
     * @return list of posts found
     */
    List<PostDTO> getByAuthorId(Long authorId);

    /**
     * Find post by its ID.
     *
     * @param id id of the post
     * @return the post found
     */
    PostDTO getById(Long id);

    /**
     * Create a new post.
     *
     * @param postPO Post DO
     * @return is successful
     */
    boolean insert(PostPO postPO);

    /**
     * Modify a post.
     *
     * @param postPO Post DO
     * @return edited post
     */
    boolean update(PostPO postPO);

    /**
     * Delete a post by its id.
     *
     * @param id id of the post to be deleted
     * @return is successful
     */
    boolean deleteById(Long id);

}

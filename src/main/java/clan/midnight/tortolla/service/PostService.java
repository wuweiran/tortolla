package clan.midnight.tortolla.service;

import clan.midnight.tortolla.entity.PostPO;

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
    List<Long> findLatest(int num);

    /**
     * Find posts of a blogger by blogger's ID.
     *
     * @param authorId id of the author
     * @return list of posts found
     */
    List<PostPO> findByAuthorId(Long authorId);

    /**
     * Find post by its ID.
     *
     * @param id id of the post
     * @return the post found
     */
    PostPO findById(Long id);

    /**
     * Create a new post.
     *
     * @param postPO Post DO
     * @return is successful
     */
    boolean create(PostPO postPO);

    /**
     * Modify a post.
     *
     * @param postPO Post DO
     * @return edited post
     */
    boolean edit(PostPO postPO);

    /**
     * Delete a post by its id.
     *
     * @param id id of the post to be deleted
     * @return is successful
     */
    boolean deleteById(Long id);

}

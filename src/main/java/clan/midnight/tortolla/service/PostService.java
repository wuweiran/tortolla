package clan.midnight.tortolla.service;

import clan.midnight.tortolla.model.Post;

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
    List<Post> findLatest(int num);

    /**
     * Find posts of a blogger by blogger's ID.
     *
     * @param authorId id of the author
     * @return list of posts found
     */
    List<Post> findByAuthorId(Long authorId);

    /**
     * Find post by its ID.
     *
     * @param id id of the post
     * @return the post found
     */
    Post findById(Long id);

    /**
     * Create a new post.
     *
     * @param post Post DO
     * @return is successful
     */
    boolean create(Post post);

    /**
     * Modify a post.
     *
     * @param post Post DO
     * @return edited post
     */
    boolean edit(Post post);

    /**
     * Delete a post by its id.
     *
     * @param id id of the post to be deleted
     * @return is successful
     */
    boolean deleteById(Long id);

}

package clan.midnight.tortolla.service;

import clan.midnight.tortolla.model.Blogger;

/**
 * @author Midnight1000
 */
public interface BloggerService {
    /**
     * Check if the pair of user name and password is authenticated
     *
     * @param username Blogger's name
     * @param password Blogger's password
     * @return Is successful
     */
    boolean authenticate(String username, String password);

    /**
     * Register a user
     *
     * @param username Blogger's name
     * @param password Blogger's password
     * @param fullName Blogger's full name
     * @return Is successful
     */
    boolean register(String username, String password, String fullName);

    /**
     * Get the current authenticated blogger
     *
     * @return Current blogger
     */
    Blogger getCurrentBlogger();


    /**
     * Get the blogger by ID
     *
     * @param id of the blogger
     * @return blogger DO
     */
    Blogger findById(Long id);
}
package clan.midnight.tortolla.service;

import clan.midnight.tortolla.entity.Blogger;

/**
 * @author Midnight1000
 */
public interface BloggerService {
    /**
     * Check if the pair of user name and password is authenticated
     *
     * @param username blogger's name
     * @param password blogger's password
     * @return blogger's uid
     */
    Long authenticate(String username, String password);

    /**
     * Register a user
     *
     * @param username Blogger's name
     * @param password Blogger's password
     * @param fullName Blogger's full name
     * @return blogger's uid
     */
    Long register(String username, String password, String fullName);

    /**
     * Get the blogger by ID
     *
     * @param id of the blogger
     * @return blogger DO
     */
    Blogger findById(Long id);

    /**
     * Get the blogger by name
     *
     * @param name of the blogger
     * @return blogger DO
     */
    Blogger findByName(String name);
}
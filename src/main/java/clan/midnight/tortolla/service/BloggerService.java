package clan.midnight.tortolla.service;

import clan.midnight.tortolla.dto.BloggerDTO;

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
    BloggerDTO authenticate(String username, String password);

    /**
     * Register a user
     *
     * @param username Blogger's name
     * @param password Blogger's password
     * @param fullName Blogger's full name
     * @return blogger's uid
     */
    BloggerDTO register(String username, String password, String fullName);

    /**
     * Get the blogger by ID
     *
     * @param id of the blogger
     * @return blogger DTO
     */
    BloggerDTO findById(Long id);

    /**
     * Get the blogger by name
     *
     * @param name of the blogger
     * @return blogger DTO
     */
    BloggerDTO findByName(String name);

    /**
     * Extract blogger's ID from JWT
     *
     * @param token JWT
     * @return ID of the blogger
     */
    Long validateToken(String token);

    /**
     * Create blogger's ID from JWT
     *
     * @param bloggerDTO blogger
     * @return signed JWT
     */
    String createToken(BloggerDTO bloggerDTO);
}
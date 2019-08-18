package clan.midnight.tortolla.services;

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
}
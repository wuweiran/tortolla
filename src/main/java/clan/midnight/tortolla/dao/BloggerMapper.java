package clan.midnight.tortolla.dao;

import clan.midnight.tortolla.model.Blogger;
import org.apache.ibatis.annotations.Mapper;

/**
 * Blogger DAO
 *
 * @author Midnight1000 (wuweiran)
 */
@Mapper
public interface BloggerMapper {

    /**
     * Get the blogger by ID
     *
     * @param id Blogger's ID
     * @return the instance of blogger
     */
    Blogger findById(long id);

    /**
     * Get the blogger by name
     *
     * @param name Blogger's Name
     * @return the instance of blogger
     */
    Blogger findByName(String name);

    /**
     * Insert the blogger to the database
     *
     * @param blogger Instance of Blogger
     * @return Mybatis return value of CRUD
     */
    int insert(Blogger blogger);

    /**
     * Update the blogger's information
     *
     * @param blogger Instance of Blogger
     * @return Mybatis return value of CRUD
     */
    int update(Blogger blogger);

    /**
     * Delete a blogger by ID
     *
     * @param id Blogger's ID
     * @return Mybatis return value of CRUD
     */
    int delete(long id);

    /**
     * Get the instance of a blogger by ID
     *
     * @param username Blogger's user name
     * @param password Blogger's password
     * @return Blogger's ID
     */
    Long getId(String username, String password);
}

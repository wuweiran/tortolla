package clan.midnight.tortolla.dao;

import clan.midnight.tortolla.entity.BloggerPO;
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
    BloggerPO getById(long id);

    /**
     * Get the blogger by name
     *
     * @param name Blogger's Name
     * @return the instance of blogger
     */
    BloggerPO getByName(String name);

    /**
     * Insert the blogger to the database
     *
     * @param blogger Instance of Blogger
     * @return Mybatis return value of CRUD
     */
    int insert(BloggerPO blogger);

    /**
     * Update the blogger's information
     *
     * @param blogger Instance of Blogger
     * @return Mybatis return value of CRUD
     */
    int update(BloggerPO blogger);

    /**
     * Delete a blogger by ID
     *
     * @param id Blogger's ID
     * @return Mybatis return value of CRUD
     */
    int delete(long id);

    /**
     * Get the instance of a blogger by name and passwordHash
     *
     * @param username     Blogger's user name
     * @param passwordHash Blogger's password
     * @return BloggerPO
     */
    BloggerPO authenticateAndGet(String username, String passwordHash);
}

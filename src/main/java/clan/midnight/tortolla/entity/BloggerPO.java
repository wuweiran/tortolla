package clan.midnight.tortolla.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * Blogger DO
 *
 * @author Midnight1000
 */
@Getter
@Setter
@ToString
public class BloggerPO {
    private Long id;
    private String username;
    private String passwordHash;
    private String fullName;
    private Date createdTime;

    public BloggerPO(String username, String passwordHash, String fullName) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.createdTime = new Date();
    }
}

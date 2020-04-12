package clan.midnight.tortolla.dto;

import clan.midnight.tortolla.entity.BloggerPO;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

/**
 * @author Midnight1000
 */
@Getter
@ToString
public class BloggerRootDTO {
    private final Long id;
    private final String username;
    private final String passwordHash;
    private final String fullName;
    private final Date createdTime;

    public BloggerRootDTO(BloggerPO bloggerPO) {
        this.id = bloggerPO.getId();
        this.username = bloggerPO.getUsername();
        this.passwordHash = bloggerPO.getPasswordHash();
        this.fullName = bloggerPO.getFullName();
        this.createdTime = bloggerPO.getCreatedTime();
    }
}

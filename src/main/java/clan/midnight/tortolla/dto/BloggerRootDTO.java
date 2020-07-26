package clan.midnight.tortolla.dto;

import clan.midnight.tortolla.entity.BloggerPO;

import java.util.Date;

/**
 * @author Midnight1000
 */
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

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public String getFullName() {
        return this.fullName;
    }

    public Date getCreatedTime() {
        return this.createdTime;
    }

    @Override
    public String toString() {
        return "BloggerRootDTO(id=" + this.getId() + ", username=" + this.getUsername() + ", passwordHash=" + this.getPasswordHash() + ", fullName=" + this.getFullName() + ", createdTime=" + this.getCreatedTime() + ")";
    }
}

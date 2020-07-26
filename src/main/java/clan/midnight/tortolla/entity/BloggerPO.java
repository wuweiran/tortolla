package clan.midnight.tortolla.entity;

import java.util.Date;

/**
 * Blogger DO
 *
 * @author Midnight1000
 */
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

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    @Override
    public String toString() {
        return "BloggerPO(id=" + this.getId() + ", username=" + this.getUsername() + ", passwordHash=" + this.getPasswordHash() + ", fullName=" + this.getFullName() + ", createdTime=" + this.getCreatedTime() + ")";
    }
}

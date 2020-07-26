package clan.midnight.tortolla.entity;

import java.util.Date;

/**
 * Post DO
 *
 * @author Midnight1000
 */
public class PostPO {
    private Long id;
    private String title;
    private String body;
    private Long authorId;
    private Date createdTime;
    private Date lastModifiedTime;

    public PostPO(Long id, String title, String body, Long authorId, Date createdTime, Date lastModifiedTime) {
        this(title, body, authorId);
        this.id = id;
        this.authorId = authorId;
        this.createdTime = createdTime;
        this.lastModifiedTime = lastModifiedTime;
    }

    public PostPO(String title, String body, Long authorId) {
        this.title = title;
        this.body = body;
        this.authorId = authorId;
        this.createdTime = new Date();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getAuthorId() {
        return this.authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public Date getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getLastModifiedTime() {
        return this.lastModifiedTime;
    }

    public void setLastModifiedTime(Date lastModifiedTime) {
        this.lastModifiedTime = lastModifiedTime;
    }

    @Override
    public String toString() {
        return "PostPO(id=" + this.getId() + ", title=" + this.getTitle() + ", body=" + this.getBody() + ", authorId=" + this.getAuthorId() + ", createdTime=" + this.getCreatedTime() + ", lastModifiedTime=" + this.getLastModifiedTime() + ")";
    }
}

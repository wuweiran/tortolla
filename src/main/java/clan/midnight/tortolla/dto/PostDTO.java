package clan.midnight.tortolla.dto;

import clan.midnight.tortolla.entity.PostPO;

import java.util.Date;

/**
 * @author Midnight1000
 */
public class PostDTO {
    private final String title;
    private final String body;
    private final Long authorId;
    private final Date createdTime;
    private final Date lastModifiedTime;

    public PostDTO(PostPO postPO) {
        this.title = postPO.getTitle();
        this.body = postPO.getBody();
        this.authorId = postPO.getAuthorId();
        this.createdTime = postPO.getCreatedTime();
        this.lastModifiedTime = postPO.getLastModifiedTime();
    }

    public String getTitle() {
        return this.title;
    }

    public String getBody() {
        return this.body;
    }

    public Long getAuthorId() {
        return this.authorId;
    }

    public Date getCreatedTime() {
        return this.createdTime;
    }

    public Date getLastModifiedTime() {
        return this.lastModifiedTime;
    }

    @Override
    public String toString() {
        return "PostDTO(title=" + this.getTitle() + ", body=" + this.getBody() + ", authorId=" + this.getAuthorId() + ", createdTime=" + this.getCreatedTime() + ", lastModifiedTime=" + this.getLastModifiedTime() + ")";
    }
}

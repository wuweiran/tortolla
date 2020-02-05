package clan.midnight.tortolla.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * Post DO
 *
 * @author Midnight1000
 */
@Getter
@Setter
@ToString
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
    }
}

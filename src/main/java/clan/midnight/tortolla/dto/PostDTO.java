package clan.midnight.tortolla.dto;

import clan.midnight.tortolla.entity.PostPO;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

/**
 * @author Midnight1000
 */
@Getter
@ToString
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
}

package clan.midnight.tortolla.dto;

import clan.midnight.tortolla.entity.PostPO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * @author Midnight1000
 */
@Getter
@Setter
@ToString
public class PostDTO {
    private String title;
    private String body;
    private Long authorId;
    private Date createdTime;
    private Date lastModifiedTime;

    public PostDTO(PostPO postPO) {
        this.title = postPO.getTitle();
        this.body = postPO.getBody();
        this.authorId = postPO.getAuthorId();
        this.createdTime = postPO.getCreatedTime();
        this.lastModifiedTime = postPO.getLastModifiedTime();
    }
}

package clan.midnight.tortolla.dto;

import clan.midnight.tortolla.entity.BloggerPO;
import lombok.Getter;
import lombok.ToString;

/**
 * @author Midnight1000
 */
@Getter
@ToString
public class BloggerAuthorDTO {
    private final Long id;
    private final String username;

    public BloggerAuthorDTO(BloggerPO bloggerPO) {
        this.id = bloggerPO.getId();
        this.username = bloggerPO.getUsername();
    }
}

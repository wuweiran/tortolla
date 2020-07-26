package clan.midnight.tortolla.dto;

import clan.midnight.tortolla.entity.BloggerPO;

/**
 * @author Midnight1000
 */
public class BloggerAuthorDTO {
    private final Long id;
    private final String username;

    public BloggerAuthorDTO(BloggerPO bloggerPO) {
        this.id = bloggerPO.getId();
        this.username = bloggerPO.getUsername();
    }

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    @Override
    public String toString() {
        return "BloggerAuthorDTO(id=" + this.getId() + ", username=" + this.getUsername() + ")";
    }
}

package clan.midnight.tortolla.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.Objects;

/**
 * Post DO
 *
 * @author Midnight1000
 */
@Getter
@Setter
@ToString
public class Post {
    private Long id;
    private String title;
    private String body;
    private Long authorId;
    private Date createdTime;
    private Date lastModifiedTime;

    public Post(String title, String body, Long authorId) {
        this.title = title;
        this.body = body;
        this.authorId = authorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Post post = (Post) o;
        return id.equals(post.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

package clan.midnight.tortolla.response;

import clan.midnight.tortolla.Post;
import clan.midnight.tortolla.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class PostWebDTO {

    private long id;
    private String title;
    private String body;
    private UserWebDTO author;
    private Date createdTime;
    private Date lastUpdatedTime;

    public static PostWebDTO fromDomain(Post post, User author) {
        return new PostWebDTO(post.getId(), post.getTitle(), post.getBody(), UserWebDTO.fromDomain(author), post.getCreatedTime(), post.getLastUpdatedTime());
    }
}

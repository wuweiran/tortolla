package clan.midnight.tortolla.response;

import clan.midnight.tortolla.Post;
import clan.midnight.tortolla.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class PostPreviewWebDTO {

    private long id;
    private String title;
    private UserBasicWebDTO author;
    private Date createdTime;
    private Date lastUpdatedTime;

    public static PostPreviewWebDTO fromDomain(Post post, User author) {
        return new PostPreviewWebDTO(post.getId(), post.getTitle(), UserBasicWebDTO.fromDomain(author), post.getCreatedTime(), post.getLastUpdatedTime());
    }
}

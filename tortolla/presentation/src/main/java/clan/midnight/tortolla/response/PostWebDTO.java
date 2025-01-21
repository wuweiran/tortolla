package clan.midnight.tortolla.response;

import clan.midnight.tortolla.Post;
import clan.midnight.tortolla.User;

import java.util.Date;

public record PostWebDTO(
        long id,
        String title,
        String body,
        UserBasicWebDTO author,
        Date createdTime,
        Date lastUpdatedTime
) {
    public static PostWebDTO fromDomain(Post post, User author) {
        return new PostWebDTO(post.getId(), post.getTitle(), post.getBody(), UserBasicWebDTO.fromDomain(author), post.getCreatedTime(), post.getLastUpdatedTime());
    }
}

package clan.midnight.tortolla.response;

import clan.midnight.tortolla.Post;
import clan.midnight.tortolla.User;

import java.util.Date;

public record PostPreviewWebDTO(
        long id,
        String title,
        UserBasicWebDTO author,
        Date createdTime,
        Date lastUpdatedTime
) {
    public static PostPreviewWebDTO fromDomain(Post post, User author) {
        return new PostPreviewWebDTO(post.getId(), post.getTitle(), UserBasicWebDTO.fromDomain(author), post.getCreatedTime(), post.getLastUpdatedTime());
    }
}

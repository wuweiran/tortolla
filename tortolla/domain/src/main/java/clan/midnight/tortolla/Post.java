package clan.midnight.tortolla;

import java.util.Date;

@SuppressWarnings("LombokGetterMayBeUsed")
public class Post {
    private final long id;
    private final String title;
    private final String body;
    private final long authorId;
    private final Date createdTime;
    private final Date lastUpdatedTime;

    public Post(long id, String title, String body, long authorId, Date createdTime, Date lastUpdatedTime) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.authorId = authorId;
        this.createdTime = createdTime;
        this.lastUpdatedTime = lastUpdatedTime;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public User getAuthor(UserRepository userRepository) {
        return userRepository.getById(authorId);
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public Date getLastUpdatedTime() {
        return lastUpdatedTime;
    }
}

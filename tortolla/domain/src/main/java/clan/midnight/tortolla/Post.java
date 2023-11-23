package clan.midnight.tortolla;

import java.util.Date;

@SuppressWarnings("LombokGetterMayBeUsed")
public class Post {
    private long id;
    private String title;
    private String body;
    private long authorId;
    private Date createdTime;
    private Date lastUpdatedTime;

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

package clan.midnight.tortolla;

import java.util.Date;

public class User {
    private final long id;
    private final String username;
    private final String passwordHash;
    private final String fullName;
    private final Date createdTime;

    public User(long id, String username, String passwordHash, String fullName, Date createdTime) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.createdTime = createdTime;
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getFullName() {
        return fullName;
    }

    public Date getCreatedTime() {
        return createdTime;
    }
}

package clan.midnight.tortolla;

import java.util.Date;

@SuppressWarnings("LombokGetterMayBeUsed")
public class User {
    private long id;
    private final String username;
    private final String passwordHash;
    private final String fullName;
    private final Date createdTime;

    public User(long id, String username, String passwordHash, String fullName, Date createdTime) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.createdTime = createdTime;
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

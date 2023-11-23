package clan.midnight.tortolla;

import java.util.Date;

@SuppressWarnings("LombokGetterMayBeUsed")
public class User {
    private String username;
    private String passwordHash;
    private String fullName;
    private Date createdTime;

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

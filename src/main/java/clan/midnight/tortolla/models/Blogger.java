package clan.midnight.tortolla.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.Objects;

/**
 * Blogger DO
 *
 * @author Midnight1000
 */
@Getter
@Setter
@ToString
public class Blogger {
    private Long id;
    private String username;
    private String passwordHash;
    private String fullName;
    private Date createdTime;

    public Blogger(Long id, String username, String passwordHash, String fullName, Date createdTime) {
        this(username, passwordHash, fullName);
        this.id = id;
        this.createdTime = createdTime;
    }

    public Blogger(String username, String passwordHash, String fullName) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Blogger blogger = (Blogger) o;
        return id.equals(blogger.id) &&
                username.equals(blogger.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username);
    }
}

package clan.midnight.tortolla.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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
    private String password;
    private String fullName;
    private Date createdTime;

    public Blogger(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public Blogger(String username, String password, String fullName) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
    }

    public Blogger(Long id, String username, String fullName) {
        this(id, username);
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

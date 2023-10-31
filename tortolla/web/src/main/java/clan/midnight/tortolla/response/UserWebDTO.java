package clan.midnight.tortolla.response;

import clan.midnight.tortolla.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class UserWebDTO {
    private String username;
    private String passwordHash;
    private String fullName;
    private Date createdTime;

    public static UserWebDTO fromDomain(User user) {
        return new UserWebDTO(user.getUsername(), user.getPasswordHash(), user.getFullName(), user.getCreatedTime());
    }
}

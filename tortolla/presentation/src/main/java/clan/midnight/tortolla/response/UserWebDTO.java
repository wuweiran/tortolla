package clan.midnight.tortolla.response;

import clan.midnight.tortolla.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class UserWebDTO {
    private long id;
    private String username;
    private String fullName;
    private Date createdTime;

    public static UserWebDTO fromDomain(User user) {
        return new UserWebDTO(user.getId(), user.getUsername(), user.getFullName(), user.getCreatedTime());
    }
}

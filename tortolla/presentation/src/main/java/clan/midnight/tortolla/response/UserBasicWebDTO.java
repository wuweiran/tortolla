package clan.midnight.tortolla.response;

import clan.midnight.tortolla.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class UserBasicWebDTO {
    private String username;
    private Date createdTime;

    public static UserBasicWebDTO fromDomain(User user) {
        return new UserBasicWebDTO(user.getUsername(), user.getCreatedTime());
    }
}


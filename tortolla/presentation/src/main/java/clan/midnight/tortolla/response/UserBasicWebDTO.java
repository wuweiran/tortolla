package clan.midnight.tortolla.response;

import clan.midnight.tortolla.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

public record UserBasicWebDTO(
        long id,
        String username,
        Date createdTime
) {
    public static UserBasicWebDTO fromDomain(User user) {
        return new UserBasicWebDTO(user.getId(), user.getUsername(), user.getCreatedTime());
    }
}


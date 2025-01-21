package clan.midnight.tortolla.response;

import clan.midnight.tortolla.User;

import java.util.Date;

public record UserWebDTO(
        long id,
        String username,
        String fullName,
        Date createdTime
) {
    public static UserWebDTO fromDomain(User user) {
        return new UserWebDTO(user.getId(), user.getUsername(), user.getFullName(), user.getCreatedTime());
    }
}

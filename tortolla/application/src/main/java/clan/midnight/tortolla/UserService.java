package clan.midnight.tortolla;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public String authenticateAndGetToken(String username, String password) {
        return "";
    }

    public String registerAndGetToken(String username, String password, String fullName) {
        return "";
    }

    public Long validateTokenAndGetUserId(String token) {
        return null;
    }
}

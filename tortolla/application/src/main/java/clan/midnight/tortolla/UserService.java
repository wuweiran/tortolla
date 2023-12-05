package clan.midnight.tortolla;

import clan.midnight.tortolla.util.JwtUtil;
import clan.midnight.tortolla.util.PasswordEncoder;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Resource
    private UserRepository userRepository;

    public String authenticateAndGetToken(String username, String password) {
        String passwordHash = PasswordEncoder.encode(password);
        User user = userRepository.getByUsername(username);
        if (user == null) {
            return null;
        }
        if (passwordHash.equals(user.getPasswordHash())) {
            return JwtUtil.createUserToken(user.getId(), 1000 * 60 * 30);
        }
        return null;
    }

    public String registerAndGetToken(String username, String password, String fullName) {
        String passwordHash = PasswordEncoder.encode(password);
        User user = userRepository.getByUsername(username);
        if (user != null) {
            return null;
        }
        user = userRepository.put(username, passwordHash, fullName);
        return JwtUtil.createUserToken(user.getId(), 1000 * 60 * 10);
    }

    public Long validateTokenAndGetUserId(String token) {
        return JwtUtil.validUserToken(token);
    }
}

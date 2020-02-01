package clan.midnight.tortolla.auth;

import org.apache.commons.codec.digest.DigestUtils;

import java.util.Objects;

/**
 * @author wwrus
 */
public class PasswordEncoder {
    private PasswordEncoder() {
    }

    public static String encode(String password) {
        Objects.requireNonNull(password);
        return DigestUtils.sha256Hex(password);
    }
}

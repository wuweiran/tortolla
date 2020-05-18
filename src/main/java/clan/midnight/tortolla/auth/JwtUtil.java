package clan.midnight.tortolla.auth;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Midnight1000
 */
@Slf4j
public class JwtUtil {
    private static final byte[] SECRET = "1234567890qwertyuiopasdfghjklzxcvbnm".getBytes();

    private static final JWSHeader HEADER = new JWSHeader(JWSAlgorithm.HS256);

    private static final String ISSUER_KEY = "iss";

    private static final String ISSUE_TIME_KEY = "iat";

    private static final String EXPIRE_TIME_KEY = "exp";

    private static final String USER_KEY = "sub";

    private JwtUtil() {}

    public static String createUserToken(long userId, long interval) {
        String tokenString = null;
        long createTimeStamp = System.currentTimeMillis();
        Map<String, Object> payload = new HashMap<>(4);
        payload.put(ISSUER_KEY, JwtUtil.class.getName());
        payload.put(ISSUE_TIME_KEY, createTimeStamp);
        payload.put(EXPIRE_TIME_KEY, createTimeStamp + interval);
        payload.put(USER_KEY, userId);
        JWSObject jwsObject = new JWSObject(HEADER, new Payload(new JSONObject(payload)));
        try {
            jwsObject.sign(new MACSigner(SECRET));
            tokenString = jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Signing error: {}", e.getMessage());
            e.printStackTrace();
        }
        return tokenString;
    }

    /**
     * Check whether the token is valid and return the Map. The collection mainly contains the state status code data.
     * This method is called in the filter and is verified every time the API is requested
     *
     * @param tokenString token
     * @return Long
     */
    public static Long validUserToken(String tokenString) {
        try {
            JWSObject jwsObject = JWSObject.parse(tokenString);
            Payload payload = jwsObject.getPayload();
            JWSVerifier verifier = new MACVerifier(SECRET);
            if (!jwsObject.verify(verifier)) {
                log.info("Verification failed");
                return null;
            }
            JSONObject payLoadJson = payload.toJSONObject();
            if (!JwtUtil.class.getName().equals(payLoadJson.getAsString(ISSUER_KEY))) {
                log.info("Not issued by this class");
                return null;
            }
            // If the payload contains an exp field, check whether it has expired
            if (payLoadJson.containsKey(EXPIRE_TIME_KEY)) {
                long extTime = Long.parseLong(payLoadJson.getAsString(EXPIRE_TIME_KEY));
                long curTime = System.currentTimeMillis();
                if (curTime > extTime) {
                    log.info("Token expired");
                    return null;
                }
            }
            return Long.valueOf(payLoadJson.get(USER_KEY).toString());
        } catch (Exception e) {
            log.error("Illegal token format: {}", tokenString);
            return null;
        }
    }
}

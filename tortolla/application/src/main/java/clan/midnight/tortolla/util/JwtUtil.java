package clan.midnight.tortolla.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

public class JwtUtil {
    private static final byte[] SECRET = "1234567890qwertyuiopasdfghjklzxcvbnm".getBytes();

    private static final JWSHeader HEADER = new JWSHeader(JWSAlgorithm.HS256);

    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);
    private static final ObjectMapper mapper = new ObjectMapper();

    private JwtUtil() {
    }

    public static class PayLoad implements Serializable {
        @JsonProperty("iss")
        String issuerKey;
        @JsonProperty("iat")
        Long issueTimeKey;
        @JsonProperty("exp")
        Long expireTimeKey;
        @JsonProperty("sub")
        Long userId;

        public PayLoad() {
        }

        public PayLoad(String issuerKey, Long issueTimeKey, Long expireTimeKey, Long userId) {
            this.issuerKey = issuerKey;
            this.issueTimeKey = issueTimeKey;
            this.expireTimeKey = expireTimeKey;
            this.userId = userId;
        }

        public String getIssuerKey() {
            return issuerKey;
        }

        public Long getIssueTimeKey() {
            return issueTimeKey;
        }

        public Long getExpireTimeKey() {
            return expireTimeKey;
        }

        public Long getUserId() {
            return userId;
        }
    }

    public static String createUserToken(long userId, long interval) {
        String tokenString = null;
        long createTimeStamp = System.currentTimeMillis();
        JwtUtil.PayLoad payload = new JwtUtil.PayLoad(JwtUtil.class.getName(), createTimeStamp, createTimeStamp + interval, userId);
        try {
            JWSObject jwsObject = new JWSObject(HEADER, new Payload(mapper.writeValueAsString(payload)));
            jwsObject.sign(new MACSigner(SECRET));
            tokenString = jwsObject.serialize();
        } catch (JOSEException | JsonProcessingException e) {
            log.error("Signing JWT error", e);
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
            JwtUtil.PayLoad payLoad = mapper.readValue(payload.toString(), JwtUtil.PayLoad.class);
            if (!JwtUtil.class.getName().equals(payLoad.getIssuerKey())) {
                log.info("Not issued by this class");
                return null;
            }
            if (payLoad.getExpireTimeKey() != null) {
                long extTime = payLoad.getExpireTimeKey();
                long curTime = System.currentTimeMillis();
                if (curTime > extTime) {
                    log.info("Token expired");
                    return null;
                }
            }
            return payLoad.getUserId();
        } catch (Exception e) {
            log.error("Illegal token format: {}", tokenString, e);
            return null;
        }
    }
}
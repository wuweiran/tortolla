package clan.midnight.tortolla.auth;

import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Midnight1000
 */
@Component
public class JwtInterceptor implements HandlerInterceptor {
    private static final Logger log = org.slf4j.LoggerFactory.getLogger(JwtInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = request.getHeader("token");
        log.info("Validating token: {}", token);
        return (JwtUtil.validUserToken(token) != null);
    }
}

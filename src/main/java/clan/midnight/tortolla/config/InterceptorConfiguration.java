package clan.midnight.tortolla.config;

import clan.midnight.tortolla.auth.JWTInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Midnight1000
 */
@SpringBootConfiguration
public class InterceptorConfiguration implements WebMvcConfigurer {

    @Autowired
    private JWTInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(jwtInterceptor)
//                .addPathPatterns("/posts/uploadImage");
    }
}

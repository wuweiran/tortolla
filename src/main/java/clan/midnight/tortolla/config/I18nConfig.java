package clan.midnight.tortolla.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

/**
 * @author Midnight1000 (wuweiran)
 */
@Configuration
@ComponentScan
public class I18nConfig {

    /**
     * I18n file path
     */
    @Value("${spring.messages.basename}")
    public String[] baseFileNames;

    @Bean(name = "localeResolver")
    public LocaleResolver localeResolverBean() {
        return new SessionLocaleResolver();
    }

    /**
     * Use to resolve messages, supporting parameterization and internationalization of them.
     */
    @Bean(name = "messageSource")
    public ResourceBundleMessageSource resourceBundleMessageSource() {
        ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        source.setBasenames(baseFileNames);
        source.setDefaultEncoding("UTF-8");
        source.setUseCodeAsDefaultMessage(true);
        return source;
    }

}

package clan.midnight.tortolla.config;

import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import javax.servlet.*;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

/**
 * @author Midnight1000 (wuweiran)
 */
@Component
@ServletComponentScan
public class I18nSwitchFilter extends HttpFilter {
    private static final String I18N_PARAMETER = "lang";

    @Override
    public void doFilter(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws IOException, ServletException {
        if (httpServletRequest.getParameter(I18N_PARAMETER) != null) {
            Locale locale;
            switch (httpServletRequest.getParameter(I18N_PARAMETER)) {
                case "zh_CN":
                    locale = Locale.CHINA;
                    break;
                case "en_US":
                    locale = Locale.US;
                    break;
                default:
                    locale = httpServletRequest.getLocale();
            }
            httpServletRequest.getSession().setAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME, locale);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
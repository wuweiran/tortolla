package clan.midnight.tortolla.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

/**
 * @author Midnight1000 (wuweiran)
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsService bloggerDetailsService;

    @Autowired
    AuthenticationFailureHandler authenticationFailureHandler;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf().ignoringAntMatchers("/posts/uploadImage")
            .and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/posts/uploadImage").hasAuthority("BLOGGER")
                .antMatchers("/posts/create").hasAuthority("BLOGGER")
            .and()
                .formLogin().loginPage("/bloggers/login")
                .failureHandler(authenticationFailureHandler)
                .defaultSuccessUrl("/").permitAll()
             .and()
                .logout().logoutUrl("/bloggers/logout")
                .logoutSuccessUrl("/").permitAll();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(bloggerDetailsService).passwordEncoder(getPasswordEncoder());
        auth.eraseCredentials(false);
    }
}

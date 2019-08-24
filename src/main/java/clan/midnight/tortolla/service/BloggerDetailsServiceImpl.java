package clan.midnight.tortolla.service;

import clan.midnight.tortolla.dao.BloggerMapper;
import clan.midnight.tortolla.model.Blogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Midnight1000 (wuweiran)
 */
@Service
public class BloggerDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private BloggerMapper bloggerMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Blogger blogger = bloggerMapper.findByName(username);
        if (blogger == null){
            throw new UsernameNotFoundException("Blogger not found!");
        }
        List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();
        simpleGrantedAuthorities.add(new SimpleGrantedAuthority("BLOGGER"));
        return new User(blogger.getUsername(), blogger.getPasswordHash(), simpleGrantedAuthorities);
    }
}

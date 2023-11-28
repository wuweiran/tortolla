package clan.midnight.tortolla;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JpaUserRepository implements UserRepository {
    @Autowired
    private UserJpaRepository jpaRepository;


    @Override
    public User getById(long id) {
        return jpaRepository.findById(id).map(po -> new User(po.getId(), po.getPasswordHash(), po.getUsername(), po.getFullName(), po.getCreatedTime())).orElse(null);
    }
}

package clan.midnight.tortolla.repository;

import clan.midnight.tortolla.User;
import clan.midnight.tortolla.persist.UserPO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JpaUserRepository implements UserRepository {
    @Autowired
    private UserJpaRepository jpaRepository;


    @Override
    public User getById(long id) {
        return jpaRepository.findById(id).map(po -> new User(po.getId(), po.getUsername(), po.getPasswordHash(), po.getFullName(), po.getCreatedTime())).orElse(null);
    }

    @Override
    public User getByUsername(String username) {
        UserPO po = jpaRepository.findByUsername(username);
        if (po == null) {
            return null;
        }
        return new User(po.getId(), po.getUsername(), po.getPasswordHash(), po.getFullName(), po.getCreatedTime());
    }

    @Override
    public User put(String username, String passwordHash, String fullName) {
        UserPO po = jpaRepository.saveAndFlush(new UserPO(null, username, passwordHash, fullName, null));
        return new User(po.getId(), po.getPasswordHash(), po.getUsername(), po.getFullName(), po.getCreatedTime());
    }
}

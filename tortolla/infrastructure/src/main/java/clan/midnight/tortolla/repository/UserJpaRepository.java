package clan.midnight.tortolla.repository;

import clan.midnight.tortolla.persist.UserPO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository extends JpaRepository<UserPO, Long> {
    UserPO findByUsername(String username);
}

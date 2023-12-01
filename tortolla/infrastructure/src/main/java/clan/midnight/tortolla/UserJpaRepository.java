package clan.midnight.tortolla;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository extends JpaRepository<UserPO, Long> {
    UserPO findByUsername(String username);
}

package clan.midnight.tortolla;

import org.springframework.data.repository.CrudRepository;

public interface UserJpaRepository extends CrudRepository<UserPO, Long> {
}

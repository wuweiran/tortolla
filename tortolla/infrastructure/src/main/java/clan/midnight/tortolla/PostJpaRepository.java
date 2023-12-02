package clan.midnight.tortolla;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PostJpaRepository extends PagingAndSortingRepository<PostPO, Long>, JpaRepository<PostPO, Long> {
}

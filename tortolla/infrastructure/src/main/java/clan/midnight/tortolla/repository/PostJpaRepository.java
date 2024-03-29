package clan.midnight.tortolla.repository;

import clan.midnight.tortolla.persist.PostPO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PostJpaRepository extends PagingAndSortingRepository<PostPO, Long>, JpaRepository<PostPO, Long> {
}

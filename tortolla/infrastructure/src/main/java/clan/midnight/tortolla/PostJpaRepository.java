package clan.midnight.tortolla;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PostJpaRepository extends PagingAndSortingRepository<PostPO, Long>, CrudRepository<PostPO, Long> {
}

package clan.midnight.tortolla;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author Midnight1000 (wuweiran)
 * @date 2019-8-7
 */
@SpringBootApplication
@EnableTransactionManagement
@MapperScan("clan.midnight.tortolla.mappers")
public class TortollaApplication {

    public static void main(String[] args) {
        SpringApplication.run(TortollaApplication.class, args);
    }

}

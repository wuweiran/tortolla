package clan.midnight.tortolla;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"clan.midnight.tortolla.controller"})
public class TortollaApplication {

    public static void main(String[] args) {
        SpringApplication.run(TortollaApplication.class, args);
    }

}

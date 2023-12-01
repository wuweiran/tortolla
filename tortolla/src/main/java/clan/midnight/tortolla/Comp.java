package clan.midnight.tortolla;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Comp {
    @Value("${spring.jpa.open-in-view}")
    public String abc;

    @PostConstruct
    public void absjf() {
        System.out.println(abc);
    }
}

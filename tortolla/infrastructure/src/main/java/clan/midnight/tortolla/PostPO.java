package clan.midnight.tortolla;

import jakarta.persistence.*;
import lombok.Getter;

import java.sql.Timestamp;

@Entity
@Table(name = "post")
@Getter
public class PostPO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "author_id", nullable = false)
    private long authorId;

    @Column(name = "created_time", nullable = false)
    private Timestamp createdTime;

    @Column(name = "last_updated_time", nullable = false)
    private Timestamp lastUpdatedTime;
}

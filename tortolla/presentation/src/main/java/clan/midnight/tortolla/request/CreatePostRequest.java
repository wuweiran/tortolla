package clan.midnight.tortolla.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreatePostRequest {
    private String title;
    private String body;
}

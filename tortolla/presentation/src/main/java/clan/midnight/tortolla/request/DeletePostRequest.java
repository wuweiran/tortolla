package clan.midnight.tortolla.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeletePostRequest {
    private Long postId;
}

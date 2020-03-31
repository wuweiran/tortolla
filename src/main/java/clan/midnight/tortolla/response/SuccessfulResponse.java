package clan.midnight.tortolla.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Midnight1000
 */
@Data
@EqualsAndHashCode(callSuper = true)
public final class SuccessfulResponse<T> extends BaseResponse {

    private T resultBody;

    public SuccessfulResponse(T resultBody) {
        this.status = BaseResponse.STATUS_SUCCESS;
        this.resultBody = resultBody;
    }
}
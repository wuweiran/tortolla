package clan.midnight.tortolla.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Midnight1000
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class FailedResponse extends BaseResponse {

    private String errorCode;

    private String errorMsg;

    public FailedResponse(String errorCode, String errorMsg) {
        this.status = BaseResponse.STATUS_FAIL;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    public FailedResponse(String errorCode) {
        this(errorCode, "");
    }


}

package clan.midnight.tortolla.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Midnight1000
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class FailedResponse extends BaseResponse {

    public static String ERROR_CODE_NOT_FOUND = "001";

    public static String ERROR_CODE_UNAUTHORIZED = "002";

    public static String ERROR_CODE_CANNOT_NEW = "003";

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

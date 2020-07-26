package clan.midnight.tortolla.response;

import java.util.Objects;

/**
 * @author Midnight1000
 */
public class FailedResponse extends BaseResponse {

    public static String ERROR_CODE_WRONG_PARAM = "A0400";

    public static String ERROR_CODE_NOT_FOUND = "001";

    public static String ERROR_CODE_UNAUTHORIZED = "A0300";

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

    public FailedResponse() {
    }


    public String getErrorCode() {
        return this.errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMsg() {
        return this.errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    @Override
    public String toString() {
        return "FailedResponse(errorCode=" + this.getErrorCode() + ", errorMsg=" + this.getErrorMsg() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof FailedResponse)) {
            return false;
        }
        final FailedResponse other = (FailedResponse) o;
        if (!super.equals(o)) {
            return false;
        }
        if (!Objects.equals(this.getErrorCode(), other.getErrorCode())) {
            return false;
        }
        if (!Objects.equals(this.getErrorMsg(), other.getErrorMsg())) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 59;
        int result = super.hashCode();
        final Object errorCode = this.getErrorCode();
        result = result * prime + (errorCode == null ? 43 : errorCode.hashCode());
        final Object errorMsg = this.getErrorMsg();
        result = result * prime + (errorMsg == null ? 43 : errorMsg.hashCode());
        return result;
    }
}

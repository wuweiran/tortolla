package clan.midnight.tortolla.response;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Objects;

@Getter
public class FailedResponse extends BaseResponse {

    public enum ErrorCode {
        CANCELLED("1"),
        UNKNOWN("2"),
        INVALID_ARGUMENT("3"),
        DEADLINE_EXCEEDED("4"),
        NOT_FOUND("5"),
        ALREADY_EXISTS("6"),
        PERMISSION_DENIED("7"),
        RESOURCE_EXHAUSTED("8"),
        FAILED_PRECONDITION("9"),
        ABORTED("10"),
        OUT_OF_RANGE("11"),
        UNIMPLEMENTED("12"),
        INTERNAL("13"),
        UNAVAILABLE("14"),
        DATA_LOSS("15"),
        UNAUTHENTICATED("16");

        private final String code;

        ErrorCode(String code) {
            this.code = code;
        }

        @JsonValue
        public String getCode() {
            return code;
        }
    }

    private final ErrorCode errorCode;

    private final String errorMsg;

    public FailedResponse(ErrorCode errorCode, String errorMsg) {
        this.status = BaseResponse.STATUS_FAIL;
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    public FailedResponse(ErrorCode errorCode) {
        this(errorCode, "");
    }

    public FailedResponse() {
        this(ErrorCode.UNKNOWN);
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
        if (!(o instanceof FailedResponse other)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        if (!Objects.equals(this.getErrorCode(), other.getErrorCode())) {
            return false;
        }
        return Objects.equals(this.getErrorMsg(), other.getErrorMsg());
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

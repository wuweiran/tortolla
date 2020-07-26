package clan.midnight.tortolla.response;

/**
 * @author wwrus
 */
public abstract class BaseResponse {
    public static final int STATUS_SUCCESS = 0;
    public static final int STATUS_FAIL = 1;
    int status;

    public BaseResponse() {
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof BaseResponse)) {
            return false;
        }
        final BaseResponse other = (BaseResponse) o;
        if (this.getStatus() != other.getStatus()) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 59;
        int result = 1;
        result = result * prime + this.getStatus();
        return result;
    }

    @Override
    public String toString() {
        return "BaseResponse(status=" + this.getStatus() + ")";
    }
}

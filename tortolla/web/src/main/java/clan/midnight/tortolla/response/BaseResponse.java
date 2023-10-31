package clan.midnight.tortolla.response;

public abstract class BaseResponse {
    public static final int STATUS_SUCCESS = 0;
    public static final int STATUS_FAIL = 1;
    protected int status;

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
        if (!(o instanceof BaseResponse other)) {
            return false;
        }
        return this.getStatus() == other.getStatus();
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
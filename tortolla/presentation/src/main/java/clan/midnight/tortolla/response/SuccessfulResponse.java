package clan.midnight.tortolla.response;

import lombok.Getter;

import java.util.Objects;

@Getter
public final class SuccessfulResponse<T> extends BaseResponse {

    private T resultBody;

    public SuccessfulResponse(T resultBody) {
        this.status = BaseResponse.STATUS_SUCCESS;
        this.resultBody = resultBody;
    }

    public SuccessfulResponse() {
    }

    public void setResultBody(T resultBody) {
        this.resultBody = resultBody;
    }

    @Override
    public String toString() {
        return "SuccessfulResponse(resultBody=" + this.getResultBody() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof SuccessfulResponse<?> other)) {
            return false;
        }
        return Objects.equals(this.getResultBody(), other.getResultBody());
    }

    @Override
    public int hashCode() {
        final int prime = 59;
        int result = super.hashCode();
        final Object resultBody = this.getResultBody();
        result = result * prime + (resultBody == null ? 43 : resultBody.hashCode());
        return result;
    }
}

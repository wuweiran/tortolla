package clan.midnight.tortolla.response;

import lombok.Data;

/**
 * @author wwrus
 */
@Data
public abstract class BaseResponse {
    public static final int STATUS_SUCCESS = 0;
    public static final int STATUS_FAIL = 1;
    int status;
}

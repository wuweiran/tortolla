package clan.midnight.tortolla.response;

public interface Response {
    int STATUS_SUCCESS = 0;
    int STATUS_FAIL = 1;

    int getStatus();
}

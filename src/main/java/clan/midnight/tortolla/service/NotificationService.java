package clan.midnight.tortolla.service;

/**
 * @author Midnight1000 (wuweiran)
 */
public interface NotificationService {
    /**
     * Push information message
     *
     * @param msg Message to push
     */
    void addInfoMessage(String msg);

    /**
     * Push error message
     *
     * @param msg Message to push
     */
    void addErrorMessage(String msg);
}
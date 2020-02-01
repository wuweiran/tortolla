package clan.midnight.tortolla.auth;

enum TokenState {

    /**
     * 过期
     */
    EXPIRED("EXPIRED"),

    /**
     * 无效(token不合法)
     */
    INVALID("INVALID"),

    /**
     * 有效的
     */
    VALID("VALID");

    private String state;

    TokenState(String state) {
        this.state = state;
    }

    /**
     * Get enum object from status string
     *
     * @param tokenState EXPIRED/INVALID/VALID
     * @return TokenState
     */
    public static TokenState getTokenState(String tokenState) {
        TokenState ts = null;
        for (TokenState state : TokenState.values()) {
            if (state.toString().equals(tokenState)) {
                ts = state;
                break;
            }
        }
        return ts;
    }

    @Override
    public String toString() {
        return this.state;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}

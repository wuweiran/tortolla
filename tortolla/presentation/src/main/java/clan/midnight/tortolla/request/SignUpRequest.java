package clan.midnight.tortolla.request;

public record SignUpRequest(
        String username,
        String password,
        String fullName
) {
}

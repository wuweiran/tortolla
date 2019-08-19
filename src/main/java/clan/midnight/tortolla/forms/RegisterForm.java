package clan.midnight.tortolla.forms;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Register DTO
 *
 * @author Midnight1000
 */
@Getter
@Setter
public class RegisterForm {
    @NotNull
    @Size(min = 3, max = 30, message = "Username size should be in the range [2...30]")
    private String username;

    @NotNull
    @Size(min = 8, max = 50, message = "Password size should be in the range [8...50]")
    private String password;

    private String fullName;
}

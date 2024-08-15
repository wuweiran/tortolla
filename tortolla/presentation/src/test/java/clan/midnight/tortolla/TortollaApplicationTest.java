package clan.midnight.tortolla;

import clan.midnight.tortolla.controller.UserController;
import clan.midnight.tortolla.request.SignInRequest;
import clan.midnight.tortolla.request.SignUpRequest;
import clan.midnight.tortolla.response.Response;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TortollaApplicationTest {
    @Resource
    private UserController controller;

    @Test
    void testSignUpThenSignIn() {
        SignUpRequest signUpRequest = new SignUpRequest("Test name", "test_password", "Full Name");
        Response signupResponse = controller.signUp(signUpRequest);
        assertEquals(Response.STATUS_SUCCESS, signupResponse.getStatus());
        SignInRequest signInRequest = new SignInRequest("Test name", "test_password");
        Response signInResponse = controller.signIn(signInRequest);
        assertEquals(Response.STATUS_SUCCESS, signInResponse.getStatus());
    }
}
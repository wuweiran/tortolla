package clan.midnight.tortolla.auth;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PasswordEncoderTest {

    @Test
    void encode() {
        assertEquals("2953d33828c3095aebe8225236ba4e23fa75e60f13bd881b9056a3295cbd64d3"
                , PasswordEncoder.encode("Hello how are you"));
    }
}
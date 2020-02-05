package clan.midnight.tortolla.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@ContextConfiguration(classes = {PostController.class})
@WebMvcTest
class PostPOControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getPost() {
    }

    @Test
    void listTop() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/posts/list_top")
                .contentType(MediaType.APPLICATION_JSON)
                .param("top", "5"))
                .andExpect(status().isOk());
    }
}
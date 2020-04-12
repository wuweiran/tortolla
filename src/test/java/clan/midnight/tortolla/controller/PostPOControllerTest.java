package clan.midnight.tortolla.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PostPOControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void listTop() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/posts/list_top")
                .contentType(MediaType.APPLICATION_JSON)
                .param("pageNum", "1")
                .param("pageSize", "10"))
                .andExpect(status().isOk());
    }
}
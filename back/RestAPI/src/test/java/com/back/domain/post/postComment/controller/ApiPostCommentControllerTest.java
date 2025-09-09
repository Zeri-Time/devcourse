package com.back.domain.post.postComment.controller;

import com.back.domain.post.post.service.PostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@ActiveProfiles("test") // 테스트 환경에서는 test 프로파일을 활성화합니다.
@SpringBootTest // 스프링부트 테스트 클래스임을 나타냅니다.
@AutoConfigureMockMvc // MockMvc를 자동으로 설정합니다.
@Transactional // 각 테스트 메서드가 종료되면 롤백됩니다.
public class ApiPostCommentController {
    @Autowired
    private MockMvc mvc; // MockMvc를 주입받습니다.

    @Autowired
    private PostService postService;

    @Test
    @DisplayName("댓글 단건조회")
    void t1() throws Exception {

    }

    @Test
    @DisplayName("댓글 다건조회")
    void t2() throws Exception {

    }
}
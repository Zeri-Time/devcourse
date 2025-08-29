package com.back.domain.post.post;

import com.back.domain.post.post.dto.PostWithAuthor;
import com.back.domain.post.post.service.PostWithAuthorService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
@ActiveProfiles("test")
@SpringBootTest
public class PostWithAuthorServiceTests {
    @Autowired
    private PostWithAuthorService postWithAuthorService;

    @Test
    @DisplayName("게시물 다건 조회")
    void t1 () {
        List<PostWithAuthor> posts = postWithAuthorService.findAllWithAuthor();
        System.out.println(posts);
        assertThat(posts).hasSize(2);
        assertThat(posts.get(0).getTitle()).isEqualTo("제목 1");
        assertThat(posts.get(1).getTitle()).isEqualTo("제목 2");

        assertThat(posts.get(0).getAuthor().getName()).isEqualTo("유저1");
        assertThat(posts.get(1).getAuthor().getName()).isEqualTo("유저2");
    }

    @Test
    @DisplayName("게시물 단건 조회")
    void t2 () {
        PostWithAuthor post = postWithAuthorService.findByIdWithAuthor(1);
        System.out.println(post);

        assertThat(post.getTitle()).isEqualTo("제목 1");
        assertThat(post.getAuthor().getName()).isEqualTo("유저1");
    }
}

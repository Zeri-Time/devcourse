package com.zt.global.initData;

import com.zt.domain.post.post.entity.Post;
import com.zt.domain.post.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BaseInitData {

    @Autowired
    private PostRepository postRepository;

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            Post post = new Post();
            post.setTitle("제목 1");

            postRepository.save(post);
        };
    }
}

package com.back.global.initData;

import com.back.domain.member.member.entity.Member;
import com.back.domain.member.member.service.MemberService;
import com.back.domain.post.post.entity.Post;
import com.back.domain.post.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Configuration
public class BaseInitData {
    private final PostService postService;
    private final MemberService memberService;

    @Autowired
    @Lazy
    private BaseInitData self;

    @Bean
    ApplicationRunner initApplicationRunner() {
        return args -> {
            self.work1();
//            self.work2();
        };
    }

    @Transactional
    public void work1() {
        if (memberService.count() > 0) return;
        Member member1= memberService.create("user1", "1234", "user1@test.com");
        Member member2= memberService.create("user2", "1234", "user2@test.com");
        Member member3= memberService.create("user3", "1234", "user3@test.com");

        if (postService.count() > 0) return;

        Post post1 = postService.write(member1,"제목 1", "내용 1");
        Post post2 =postService.write(member2, "제목 2", "내용 2");
        Post post3 =postService.write(member3, "제목 3", "내용 3");
    }

    @Transactional
    public void work2() {

    }

}
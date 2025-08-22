package com.zt.global.initData;


import com.zt.domain.member.member.entity.Member;
import com.zt.domain.member.member.service.MemberService;
import com.zt.domain.post.post.entity.Post;
import com.zt.domain.post.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration
@RequiredArgsConstructor
public class TestInitData {
    @Autowired
    @Lazy
    private TestInitData self;
    private final PostService postService;
    private final MemberService memberService;

    @Bean
    ApplicationRunner testInitDataApplicationRunner() {
        return args -> {
            if (memberService.count() > 0) return;
            Member memberUser1 = memberService.join("user1", "1234", "유저1");

            if (postService.count() >= 4) return;

            Post post1 = postService.write(memberUser1,"제목 3", "내용 3");
            Post post2 = postService.write(memberUser1,"제목 4", "내용 4s");

            System.out.println("테스트 데이터가 초기화 되었습니다.");
        };
    }

}
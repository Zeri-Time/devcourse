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
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Configuration
// dev, test, prod 등 활성화된 프로파일에 상관없이 항상 실행
public class BaseInitData {
    @Autowired
    @Lazy
    private BaseInitData self;

    private final PostService postService;
    private final MemberService memberService;

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            self.work1();
            self.work2();
            // 별도의 Thread 를 사용 이유 : work3 메서드에서 예외가 발생해도 스프링부트가 꺼지지 않도록
            new Thread(() -> self.work3()).start();
            self.work4();
        };
    }

    @Transactional
    void work1() {
        if (memberService.count() > 0) return;
        Member memberSystem = memberService.join("system", "1234", "시스템");
        Member memberAdmin = memberService.join("admin", "1234", "관리자");
        Member memberUser1 = memberService.join("user1", "1234", "유저1");
        Member memberUser2 = memberService.join("user2", "1234", "유저2");
        Member memberUser3 = memberService.join("user3", "1234", "유저3");

        if (postService.count() > 0) return;

        Post post1 = postService.write(memberUser1, "제목 1", "내용 1");
        Post post2 = postService.write(memberUser2,"제목 2", "내용 2");

        System.out.println("post1.getId() : " +  post1.getId());
        System.out.println("post2.getId() : " +  post2.getId());

        System.out.println("기본 데이터가 초기화 되었습니다.");
    }

    @Transactional(readOnly = true)
    void work2() {
        Optional<Post> opPost = postService.findById(1);
        // SELECT * FROM post WHERE id = 1;

        Post post = opPost.get();

        System.out.println("post : " + post);
    }

    @Transactional
    void work3() {
        Optional<Post> opPost = postService.findById(1);
        Post post = opPost.get();

        postService.modify(post, "제목 1 수정", "내용 1 수정");

        if (true) throw new RuntimeException("work3 에서 예외 발생");

        Optional<Post> opPost2 = postService.findById(2);
        Post post2 = opPost2.get();

        postService.modify(post2, "제목 2 수정", "내용 2 수정");

    }

    @Transactional
    void work4() {
        Optional<Post> opPost1  = postService.findById(1);
        Post post1 = opPost1.get();

        postService.modify(post1, "제목 1 수정", "내용 1 수정");
    }
}
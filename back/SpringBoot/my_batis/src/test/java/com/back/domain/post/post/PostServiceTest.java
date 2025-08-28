package com.back.domain.post.post;

import com.back.domain.post.post.dto.Post;
import com.back.domain.post.post.service.PostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@SpringBootTest
public class PostServiceTest {
    @Autowired
    private PostService postService;

    @Test
    @DisplayName("게시물 다건 조회")
    void t1 () {
        List<Post> posts = postService.findAll();

        assertThat(posts).hasSize(2);
    }

    @Test
    @DisplayName("게시물 단건 조회")
    void t2 () {
        Post post = postService.findById(1);

        assertThat(post.getTitle()).isEqualTo("제목 1");
        assertThat(post.getContent()).isEqualTo("내용 1");
    }

    @Test
    @DisplayName("게시물 생성")
    void t3 () {
        // when: 게시글 작성
        int id = postService.create("제목 3", "내용 3");
        // then: 해당 id의 게시글 불러오기
        Post post = postService.findById(id);

        assertThat(post.getTitle()).isEqualTo("제목 3");
        assertThat(post.getContent()).isEqualTo("내용 3");
    }

    @Transactional
    @Test
    @DisplayName("게시물 생성")
    void t4 () {
        // when: 게시글 작성
        postService.createV2("제목 3", "내용 3");
        // then: 해당 id의 게시글 불러오기
        int id = postService.getLastInsertId();
        Post post = postService.findById(id);

        assertThat(post.getTitle()).isEqualTo("제목 3");
        assertThat(post.getContent()).isEqualTo("내용 3");
    }

    @Transactional
    @Test
    @DisplayName("게시물 삭제")
    void t5 () {
        // when: 게시글 작성
        postService.deleteById(1);

        List<Post> posts = postService.findAll();

        assertThat(posts).hasSize(1);
    }

    @Transactional
    @Test
    @DisplayName("게시물 수정")
    void t6 () {
        // given: 기존 게시물 1번 불러오기
        Post post = postService.findById(1);
        assertThat(post).isNotNull();

        // when: 제목/내용 수정
        postService.update(1, "제목 1 수정", "내용 1 수정");

        // then: 수정 결과 확인
        Post updatedPost = postService.findById(1);

        assertThat(updatedPost.getTitle()).isEqualTo("제목 1 수정");
        assertThat(updatedPost.getContent()).isEqualTo("내용 1 수정");
    }

    @Test
    @DisplayName("게시물 제목 검색")
    void t7 () {
        List<Post> posts = postService.search("title", "제목 1");
        System.out.println("1 : " + posts);

        posts = postService.search("title", "제목");
        assertThat(posts).hasSize(2);

        posts = postService.search("title", "제목 2");
        assertThat(posts).hasSize(1);
    }

    @Test
    @DisplayName("게시물 내용 검색")
    void t8 () {
        List<Post> posts = postService.search("content", "내용 1");
        assertThat(posts).hasSize(1);

        posts = postService.search("content", "내용");
        assertThat(posts).hasSize(2);

        posts = postService.search("content", "내용 2");
        assertThat(posts).hasSize(1);
    }

    @Test
    @DisplayName("게시물 제목 or 내용 검색")
    void t9 () {
        List<Post> posts = postService.search("", "제목 1");
        assertThat(posts).hasSize(1);

        posts = postService.search("", "제목");
        assertThat(posts).hasSize(2);

        posts = postService.search("", "제목 2");
        assertThat(posts).hasSize(1);

        posts = postService.search("", "내용 1");
        assertThat(posts).hasSize(1);

        posts = postService.search("", "내용");
        assertThat(posts).hasSize(2);

        posts = postService.search("", "내용 2");
        assertThat(posts).hasSize(1);
    }

    @Test
    @DisplayName("정렬된 게시물 조회 - 제목 오름차순")
    void t10() {
        List<Post> posts = postService.findAllOrdered("title", "asc");
        assertThat(posts).hasSize(2);
        assertThat(posts.get(0).getTitle()).isEqualTo("제목 1");
        assertThat(posts.get(1).getTitle()).isEqualTo("제목 2");
    }


    @Test
    @DisplayName("정렬된 게시물 조회 - 제목 내림차순")
    void t11() {
        List<Post> posts = postService.findAllOrdered("title", "desc");
        assertThat(posts).hasSize(2);
        assertThat(posts.get(0).getTitle()).isEqualTo("제목 2");
        assertThat(posts.get(1).getTitle()).isEqualTo("제목 1");
    }

    @Test
    @DisplayName("정렬된 게시물 조회 - 생성일 내림차순")
    void t12() {
        postService.create("제목 0", "내용 0");
        List<Post> posts = postService.findAllOrdered("createDate", "desc");
        System.out.println(posts);
        assertThat(posts).hasSize(3);

        assertThat(posts.get(0).getTitle()).isEqualTo("제목 0");
        assertThat(posts.get(1).getTitle()).isEqualTo("제목 2");
        assertThat(posts.get(2).getTitle()).isEqualTo("제목 1");
    }

    @Test
    @DisplayName("게시물 수정 - 일부 데이터만 수정하기")
    void t13 () {
        // given: 기존 게시물 1번 불러오기
        Post post = postService.findById(1);
        assertThat(post).isNotNull();

        // when: 제목/내용 수정
        postService.update(1, "", "내용 1 수정");

        // then: 수정 결과 확인
        Post updatedPost = postService.findById(1);

        assertThat(updatedPost.getTitle()).isEqualTo("제목 1");
        assertThat(updatedPost.getContent()).isEqualTo("내용 1 수정");
    }

    @Test
    @DisplayName("다중 게시물 삭제")
    void t14() {
        // given: 추가 게시물 생성
        int id3 = postService.create("제목 3", "내용 3");
        int id4 = postService.create("제목 4", "내용 4");
        List<Post> addPosts = postService.findAll();
        assertThat(addPosts).hasSize(4); // 기존 + 추가 4개

        // when: 다중 삭제
        int deletedCount = postService.deleteByIds(Arrays.asList(id3, id4));
        assertThat(deletedCount).isEqualTo(2);

        // then: 삭제 확인
        List<Post> posts = postService.findAll();
        assertThat(posts).hasSize(2); // 기존 2개만 남음
    }
}
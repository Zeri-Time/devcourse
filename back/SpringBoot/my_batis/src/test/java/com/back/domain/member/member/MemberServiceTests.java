package com.back.domain.member.member;

import com.back.domain.member.dto.Member;
import com.back.domain.member.service.MemberService;
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
public class MemberServiceTests {
    @Autowired
    private MemberService memberService;

    @Test
    @DisplayName("회원 다건 조회")
    void t1() {
        List<Member> members = memberService.findAll();

        assertThat(members).hasSize(2);
    }

    @Test
    @DisplayName("회원 단건 조회 - ID로 조회")
    void t2() {
        Member member = memberService.findById(1);

        assertThat(member.getUsername()).isEqualTo("user1");
        assertThat(member.getName()).isEqualTo("유저1");
        assertThat(member.getEmail()).isEqualTo("user1@test.com");
    }

    @Test
    @DisplayName("회원 단건 조회 - Username으로 조회")
    void t3() {
        Member member = memberService.findByUsername("user2");

        assertThat(member.getName()).isEqualTo("유저2");
        assertThat(member.getEmail()).isEqualTo("user2@test.com");
    }

    @Test
    @DisplayName("회원 생성")
    void t4() {
        // when: 회원 생성
        int id = memberService.create("user3", "{noop}1234", "유저3", "user3@test.com");

        // then: 해당 id의 회원 불러오기
        Member member = memberService.findById(id);

        assertThat(member.getUsername()).isEqualTo("user3");
        assertThat(member.getName()).isEqualTo("유저3");
        assertThat(member.getEmail()).isEqualTo("user3@test.com");
        assertThat(member.getPassword()).isEqualTo("{noop}1234");
    }
    @Test
    @DisplayName("회원 삭제")
    void t5() {
        // when: 회원 삭제
        memberService.deleteById(1);

        List<Member> members = memberService.findAll();

        assertThat(members).hasSize(1);
    }

    @Test
    @DisplayName("회원 정보 수정")
    void t6() {
        // given: 기존 회원 1번 불러오기
        Member member = memberService.findById(1);
        assertThat(member).isNotNull();

        // when: 회원 정보 수정
        memberService.update(1, "user1_updated", "{noop}5678", "유저1 수정", "user1_updated@test.com");

        // then: 수정 결과 확인
        Member updatedMember = memberService.findById(1);

        assertThat(updatedMember.getUsername()).isEqualTo("user1_updated");
        assertThat(updatedMember.getName()).isEqualTo("유저1 수정");
        assertThat(updatedMember.getEmail()).isEqualTo("user1_updated@test.com");
        assertThat(updatedMember.getPassword()).isEqualTo("{noop}5678");
    }

    @Test
    @DisplayName("회원 정보 수정 - 일부 데이터만 수정하기")
    void t7() {
        // given: 기존 회원 1번 불러오기
        Member member = memberService.findById(1);
        assertThat(member).isNotNull();

        // when: 이름만 수정
        memberService.update(1, "", "", "유저1 수정됨", "");

        // then: 수정 결과 확인
        Member updatedMember = memberService.findById(1);

        assertThat(updatedMember.getUsername()).isEqualTo("user1"); // 기존값 유지
        assertThat(updatedMember.getName()).isEqualTo("유저1 수정됨"); // 수정됨
        assertThat(updatedMember.getEmail()).isEqualTo("user1@test.com"); // 기존값 유지
    }
}
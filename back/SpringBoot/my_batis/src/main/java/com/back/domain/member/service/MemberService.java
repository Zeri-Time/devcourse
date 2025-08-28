package com.back.domain.member.service;

import com.back.domain.member.dto.Member;
import com.back.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    public Member findById(int id) {
        return memberRepository.findById(id);
    }

    public Member findByUsername(String username) {
        return memberRepository.findByUsername(username);
    }

    public int create(String username, String password, String name, String email) {
        Member member = new Member();
        member.setUsername(username);
        member.setPassword(password);
        member.setName(name);
        member.setEmail(email);

        memberRepository.save(member);
        return member.getId();
    }

    public void deleteById(int id) {
        memberRepository.deleteById(id);
    }

    public void update(int id, String username, String password, String name, String email) {
        int updatedRow = memberRepository.update(id, username, password, name, email);

        if (updatedRow != 1) {
            throw new IllegalStateException("회원 정보 수정 실패");
        }

    }
}
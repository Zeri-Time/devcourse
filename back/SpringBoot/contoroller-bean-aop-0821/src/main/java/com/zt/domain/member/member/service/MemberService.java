package com.zt.domain.member.member.service;

import com.zt.domain.member.member.entity.Member;
import com.zt.domain.member.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public long count() {
        return memberRepository.count();
    }

    public Member join(String username, String password, String nickname) {
        return memberRepository.save(
                new Member(username, password, nickname)
        );
    }

    public Optional<Member> findByUsername(String username) {
        return memberRepository.findByUsername(username);
    }

}
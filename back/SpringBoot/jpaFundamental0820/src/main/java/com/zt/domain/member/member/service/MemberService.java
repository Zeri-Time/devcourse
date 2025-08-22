package com.zt.domain.member.member.service;

import com.zt.domain.member.member.entity.Member;
import com.zt.domain.member.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
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
}

package com.back.domain.member.controller;

import com.back.domain.member.dto.Member;
import com.back.domain.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/login")
    public String login() {
        return "member/member/login";
    }

    @PostMapping("/login")
    @ResponseBody
    public String login(String username, String password, HttpSession session) {
        Member member = memberService.findByUsername(username);

        session.setAttribute("loggedInMemberId", member.getId());

        System.out.println(session.getAttribute("loggedInMemberId"));
        return "로그인 처리";
    }

    @GetMapping("/logout")
    @ResponseBody
    public String logOut(HttpSession session) {
        session.removeAttribute("loggedInMemeberId");

        return "로그아웃 처리";
    }


}

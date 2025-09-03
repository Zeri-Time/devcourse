package com.back.domain.member.member.controller;

import com.back.domain.member.member.service.MemberService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/members")
@RequiredArgsConstructor
@Controller
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/register")
    public String showRegister(RegisterForm registerForm) {
        return "member/member/register";
    }

    @ToString
    @Getter
    @Setter
    public static class RegisterForm{
        @Size(min=3, max= 25)
        @NotBlank(message = "유저 ID는 필수 항목입니다.")
        private String username;

        @NotBlank(message = "패스워드는 필수 항목입니다.")
        private String password;

        @NotBlank(message = "패스워드 확인은 필수 항목입니다.")
        private String password_conform;

        @NotBlank(message = "이메일은  필수 항목입니다.")
        @Email
        private String email;
    }

    @PostMapping("/register")
    public String register(@Valid RegisterForm registerForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "member/member/register";
        }

        // 비밀번호 불일치 문제
        if (!registerForm.getPassword().equals(registerForm.getPassword_conform())) {
            bindingResult.rejectValue("password_conform", "passwordMissMatch", "패스워드가 일치하지 않습니다.");

            return "member/member/register";
        }

        memberService.findByUsername(registerForm.getUsername());

        try {
            memberService.create(registerForm.getUsername(), registerForm.getPassword(), registerForm.getEmail());
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.rejectValue("username", "checkedMemberByUsername", "이미 가입된 회원입니다.");
            return "member/member/register";
        } catch (Exception e) {
            e.printStackTrace();
            bindingResult.reject("registerError", e.getMessage());
            return "member/member/register";
        }

        return "post/post/list";
    }

    @Getter
    @Setter
    public static class LoginForm{
        @Size(min=3, max= 25)
        @NotBlank(message = "유저 ID는 필수 항목입니다.")
        private String username;

        @NotBlank(message = "패스워드는 필수 항목입니다.")
        private String password;
    }

    @GetMapping("/login")
    public String showLogin(LoginForm loginForm) {
        return "member/member/login";
    }
}
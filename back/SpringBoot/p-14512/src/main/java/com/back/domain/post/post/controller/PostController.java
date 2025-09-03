package com.back.domain.post.post.controller;

import com.back.domain.member.member.entity.Member;
import com.back.domain.member.member.service.MemberService;
import com.back.domain.post.post.dto.ModifyForm;
import com.back.domain.post.post.dto.WriteForm;
import com.back.domain.post.post.entity.Post;
import com.back.domain.post.post.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequestMapping("/posts")
@RequiredArgsConstructor
@Controller
public class PostController {
    private final PostService postService;
    private final MemberService memberService;

    @GetMapping("/write")
    public String showWrite(@ModelAttribute("form") WriteForm form) {
        return "post/post/write";
    }

    @PostMapping("/write")
    @Transactional
    public String write(
            @ModelAttribute("form") @Valid WriteForm form,
            BindingResult bindingResult,
            Model model,
            Principal principal
    ) {
        if (bindingResult.hasErrors()) {
            return "post/post/write";
        }

        String username = principal.getName();
        Member member = memberService.findByUsername(username);

        Post post = postService.write(member, form.title(), form.content());

        model.addAttribute("post", post);

        return "redirect:/posts/detail/" + post.getId();
    }

    @Transactional(readOnly = true)
    @GetMapping("/detail/{id}")
    public String detail(@PathVariable Integer id, Model model) {
        Post post = postService.findById(id);
        model.addAttribute("post", post);

        return "post/post/detail";
    }

    @Transactional(readOnly = true)
    @GetMapping("/list")
    public String list(Model model) {
        List<Post> posts = postService.findAll();
        model.addAttribute("posts", posts);

        return "post/post/list";
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Integer id, Principal principal) {

        Post post = postService.findById(id);

        // 로그인 사용자가 작성자와 같은 유저인지 검증
        if(!post.getAuthor().getUsername().equals(principal.getName())){
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        postService.delete(post);

        return "redirect:/posts/list";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/modify/{id}")
    public String showModify(@PathVariable Integer id, Model model, Principal principal) {
        Post post = postService.findById(id);

        if(!post.getAuthor().getUsername().equals(principal.getName())){
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        ModifyForm form = new ModifyForm(post.getTitle(), post.getContent());

        model.addAttribute("modifyForm", form);
        model.addAttribute("id", id);

        return "post/post/modify";
    }

    @Transactional
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/modify/{id}")
    public String modify(@PathVariable Integer id, @Valid ModifyForm modifyForm, BindingResult bindingResult, Principal principal) {
        if (bindingResult.hasErrors()) {
            return "post/posts/modify";
        }

        Post post = postService.findById(id);

        if (!post.getAuthor().getUsername().equals(principal.getName())) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        postService.modify(post, modifyForm.title(), modifyForm.content());

        return "redirect:/posts/detail/" + id;
    }

}
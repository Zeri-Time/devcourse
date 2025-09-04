package com.back.domain.post.post.controller;

import com.back.domain.post.post.dto.PostDto;
import com.back.domain.post.post.dto.PostWriteReqBody;
import com.back.domain.post.post.dto.PostWriteResBody;
import com.back.domain.post.post.entity.Post;
import com.back.domain.post.post.service.PostService;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // @Controller + @ResponseBody
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class ApiV1PostController {
    private final PostService postService;

    @Transactional(readOnly = true)
    @GetMapping
    public List<PostDto> getItems() {
        List<Post> items = postService.getList();

        return items
                .stream()
                .map(PostDto::new) // postDto 변환
                .toList();
    }

    @Transactional(readOnly = true)
    @GetMapping("/{id}")
    public PostDto getItem(@PathVariable Long id) {
        Post item = postService.findById(id);

        return new PostDto(item);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public RsData<PostDto> delete(@PathVariable Long id) {
        Post post = postService.findById(id);

        postService.delete(post);

        return new RsData<>("200-1", "%d번 게시글이 삭제되었습니다.".formatted(id), new PostDto(post));
    }

    @PostMapping
    @Transactional
    public RsData<PostWriteResBody> write(@Valid @RequestBody PostWriteReqBody form) {
        Post post = postService.create(form.title(), form.content());


        return new RsData<>(
                "200-1",
                "%d번 게시글이 작성되었습니다.".formatted(post.getId()),
                new PostWriteResBody(postService.count(), new PostDto(post))
        );
    }
}
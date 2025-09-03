package com.back.domain.post.post.service;

import com.back.domain.member.member.entity.Member;
import com.back.domain.post.post.entity.Post;
import com.back.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    public long count() {
        return postRepository.count();
    }

    public Post write(Member author, String title, String content) {
        Post post = new Post(author, title, content);

        return postRepository.save(post);
    }

    public Post findById(Integer id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("예외발생"));
    }

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public void delete(Post post) {
        postRepository.delete(post);
    }

    public void modify(Post post, String title, String content) {
        post.modify(title, content);

    }
}
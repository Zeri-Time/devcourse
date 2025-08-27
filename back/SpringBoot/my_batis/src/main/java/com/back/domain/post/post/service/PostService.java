package com.back.domain.post.post.service;

import com.back.domain.post.post.dto.Post;
import com.back.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    public List<Post> findAll() {
        return postRepository.findAll("","");
    }

    public List<Post> findAll(String orderBy, String orderDirection) {
        return postRepository.findAll(orderBy, orderDirection);
    }

    public Post findById(int id) {
        return postRepository.findById(id);
    }

    public int create(String title, String content) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);

        postRepository.create(post);
        return post.getId();
    }

    public void createV2(String title, String content) {
        postRepository.createV2(title, content);
    }

    public int getLastInsertId() {
        return postRepository.getLastInsertId();
    }

    public void deleteById(int id) {
        postRepository.deleteById(id);
    }

    public void update(int id, String title, String content) {
        int updatedRows = postRepository.update(id, title, content);

        if (updatedRows != 1) {
            throw new IllegalStateException("게시물 수정 실패");
        }
    }

    public List<Post> search(String kwType, String kw) {
        return postRepository.search(kwType, kw);
    }
}
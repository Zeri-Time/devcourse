package com.back.domain.post.post.service;

import com.back.domain.post.post.dto.PostWithAuthor;
import com.back.domain.post.post.repository.PostWithAuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostWithAuthorService {
    private final PostWithAuthorRepository postWithAuthorRepository;

    public List<PostWithAuthor> findAllWithAuthor() {
        return postWithAuthorRepository.findAllWithAuthor();
    }

    public PostWithAuthor findByIdWithAuthor(int id) {
        return postWithAuthorRepository.findByIdWithAuthor(id);
    }
}

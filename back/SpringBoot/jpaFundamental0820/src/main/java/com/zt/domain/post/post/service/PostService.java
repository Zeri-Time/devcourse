package com.zt.domain.post.post.service;

import com.zt.domain.member.member.entity.Member;
import com.zt.domain.post.post.entity.Post;
import com.zt.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    public Post save(Post post) {
        return postRepository.save(post);
    }

    public Optional<Post> findById(int id) {
        return postRepository.findById(id);
    }

    public long count() {
        return postRepository.count();
    }

    public void modify(Post post, String title, String content) {
        post.setTitle(title);
        post.setContent(content);

        // postRepository.save(post);
        // UPDATE post SET title = ?, content = ?, modifyDate = ? where id = ?
    }

    public Post write(Member author, String title, String content) {
        Post post = new Post(author, title, content);

        return postRepository.save(post);
    }
}
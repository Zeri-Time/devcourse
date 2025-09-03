package com.back.domain.post.post.dto;

import com.back.domain.post.post.entity.Post;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostDto {
    private long id;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String subject;
    private String body;

    public PostDto(Post post) {
        this.id = post.getId();
        this.createdDate = post.getCreateDate();
        this.modifiedDate = post.getModifyDate();
        this.subject = post.getTitle();
        this.body = post.getContent();
    }
}

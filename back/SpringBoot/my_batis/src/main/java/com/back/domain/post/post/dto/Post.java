package com.back.domain.post.post.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Post {
    private int id;
    private String title;
    private String content;

    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
}

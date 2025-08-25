package com.zt.domain.wiseSaying.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class WiseSaying {
    private int id;
    private String content;
    private String author;

    public void modify(String content, String author) {
        this.content = content;
        this.author = author;
    }
}

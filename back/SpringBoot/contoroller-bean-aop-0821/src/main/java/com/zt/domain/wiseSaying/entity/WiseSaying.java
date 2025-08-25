package com.zt.domain.wiseSaying.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class WiseSaying {
    @Setter
    private int id;
    private String content;
    private String author;

    public WiseSaying(String content, String author) {
        this.content = content;
        this.author = author;
    }

    public void modify(String content, String author) {
        this.content = content;
        this.author = author;
    }

    public boolean isNew() {
        return id == 0;
    }
}
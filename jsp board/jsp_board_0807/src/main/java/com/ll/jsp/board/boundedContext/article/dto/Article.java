package com.ll.jsp.board.boundedContext.article.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class Article {
    private long id;
    private String title;
    private String content;
}
package com.ll.jsp.board.boundedContext.article.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigInteger;
import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class ArticleDto {
    private long id;
    private String title;
    private String content;
    private String author;
    private String regDate;

    public ArticleDto(Map<String, Object> row) {
        this.id = ((BigInteger) row.get("id")).longValue();
        this.title = (String) row.get("title");
        this.content = (String) row.get("content");
        this.author = (String) row.get("username");
        this.regDate = row.get("regDate").toString();
    }
}
package com.ll.jsp.board.boundedContext.article.entity;

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
public class Article {
    private long id;
    private String title;
    private String content;
    private long memberId;
    private String regDate;

    public Article(Map<String, Object> row) {
        this.id = ((BigInteger) row.get("id")).longValue();
        this.title = (String) row.get("title");
        this.content = (String) row.get("content");
        this.regDate = row.get("regDate").toString();
    }
}
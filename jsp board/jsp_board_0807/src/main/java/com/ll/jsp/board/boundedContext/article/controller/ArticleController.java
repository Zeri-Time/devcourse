package com.ll.jsp.board.boundedContext.article.controller;


import com.ll.jsp.board.boundedContext.article.dto.Article;
import com.ll.jsp.board.boundedContext.global.base.Rq;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

public class ArticleController {
    private List<Article> articleList;
    private long lastId;

    public ArticleController() {
        articleList = new ArrayList<>();
        makeTestData();
        lastId = articleList.get(articleList.size() -1).getId();
    }

    void makeTestData() {
        LongStream.rangeClosed(1, 5).forEach(i -> {
            Article article = new Article(i, "제목 " + i, "내용 " + i);
            articleList.add(article);
        });
    }

    public void showList(Rq rq) {
//        List<Article> articleList = this.articleList;
//        Collections.reverse(articleList);
        List<Article> articleList = this.articleList.stream()
                .sorted(Comparator.comparing(Article::getId).reversed()) // 정렬 기준 예시
                .toList();

        rq.setAttr("articleList", articleList);

        rq.view("usr/article/list");
    }

    public void showWrite(Rq rq) {

        rq.view("usr/article/write");
    }

    public void doWrite(Rq rq) {
        String title = rq.getParam("title", "");

        if (title.isBlank()) {
            rq.appendBody("""
                    <script>
                        alert('제목을 입력해주세요.');
                        history.back();
                    </script>
                    """);
            return;
        }

        String content = rq.getParam("content", "");

        if (title.isBlank()) {
            rq.appendBody("""
                    <script>
                        alert('내용을 입력해주세요.');
                        history.back();
                    </script>
                    """);
            return;
        }

        long id = ++lastId;
        Article article = new Article(id, title, content);

        articleList.add(article);

        rq.appendBody("""
                <div>%d 게시물 생성</div>
                <div>제목 : %s</div>
                <div>내용 : %s</div>
                <a href="/usr/article/list">목록으로</a>
                """.formatted(article.getId(), title, content));
    }
}
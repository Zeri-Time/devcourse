package com.ll.jsp.board.boundedContext.article.controller;


import com.ll.jsp.board.boundedContext.article.dto.ArticleDto;
import com.ll.jsp.board.boundedContext.article.entity.Article;
import com.ll.jsp.board.boundedContext.article.service.ArticleService;
import com.ll.jsp.board.boundedContext.base.Container;
import com.ll.jsp.board.boundedContext.global.base.Rq;
import com.ll.jsp.board.boundedContext.member.dto.Member;

import java.util.List;

public class ArticleController {

    private ArticleService articleService;

    public ArticleController() {
        articleService = Container.articleService;
    }

    public void showList(Rq rq) {
        List<ArticleDto> articleDtoList = articleService.joinMemberFindAll();

        if (articleDtoList.isEmpty()) {
            rq.replace("게시물이 존재하지 않습니다.", "/");
        }

        rq.setAttr("articleDtoList", articleDtoList);
        rq.view("usr/article/list");
    }

    public void showWrite(Rq rq) {

        rq.view("usr/article/write");
    }

    public void doWrite(Rq rq) {

        if (!rq.isLogined()) {
            rq.replace("게시글 작성은 회원만 할 수 있습니다.", "/usr/article/list");
        }
        ;

        String title = rq.getParam("title", "");

        if (title.trim().isBlank()) {
            rq.replace("제목을 입력해주세요.", "/usr/article/write");
            return;
        }

        String content = rq.getParam("content", "");


        if (content.trim().isBlank()) {
            rq.replace("내용을 입력해주세요.", "/usr/article/write");
            return;
        }

        Member member = rq.getLoggedInMemer();

        long id = articleService.write(title, content, member);

        rq.replace("%d번 게시물이 작성되었습니다.".formatted(id), "/usr/article/detail/%d".formatted(id));
    }

    public void showDetail(Rq rq) {
        long id = rq.getLongPathValueByIndex(1, 0);
        if (id <= 0) {
            rq.historyBack("올바른 요청이 아닙니다.");
            return;
        }

        ArticleDto articleDto = articleService.joinMemberFindById(id);

        if (articleDto == null) {
            rq.replace("%d번 게시물이 존재하지 않습니다.".formatted(id), "/usr/article/list");
            return;
        }

        rq.setAttr("articleDto", articleDto);
        rq.view("usr/article/detail");
    }

    public void showModify(Rq rq) {
        long id = rq.getLongPathValueByIndex(1, 0);

        if (id <= 0) {
            rq.historyBack("올바른 요청이 아닙니다.");
            return;
        }

        Article article = articleService.findById(id);


        if (article == null) {
            rq.replace("%d번 게시물이 존재하지 않습니다.".formatted(id), "/usr/article/list");
            return;
        }

        rq.setAttr("article", article);
        rq.view("usr/article/modify");
    }

    public void doModify(Rq rq) {
        long id = rq.getLongPathValueByIndex(1, 0);

        String title = rq.getParam("title", "");

        if (title.trim().isBlank()) {
            rq.replace("제목을 입력해주세요.", "/usr/article/modify/%d".formatted(id));
            return;
        }

        String content = rq.getParam("content", "");

        if (content.trim().isBlank()) {
            rq.replace("내용을 입력해주세요.", "/usr/article/modify/%d".formatted(id));
            return;
        }

        articleService.modify(id, title, content);

        rq.replace("%d번 게시물이 수정되었습니다.".formatted(id), "/usr/article/detail/%d".formatted(id));
    }

    public void doDelete(Rq rq) {
        int id = rq.getIntParam("deleteId", 0);

//        long id = rq.getLongPathValueByIndex(1, 0);

        if (id <= 0) {
            rq.historyBack("올바른 요청이 아닙니다.");
            return;
        }

        Article article = articleService.findById(id);

        if (article == null) {
            rq.replace("%d번 게시물이 존재하지 않습니다.".formatted(id), "/usr/article/list");
            return;
        }


        articleService.delete(id);

        rq.replace("%d번 게시물이 삭제되었습니다.".formatted(id), "/usr/article/list");
    }
}
package com.ll.jsp.board.gugudan;

import com.ll.jsp.board.Rq;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/gugudan") // 이 서블릿은 /gugudan 경로로 접근할 때 실행됨
public class GugudanServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Rq rq = new Rq(req, resp);

        int dan = rq.getIntParam("dan", 9); // 구구단의 단을 8로 설정
        int limit = rq.getIntParam("limit", 9); // 구구단의 곱셈 범위

        rq.writer("<h1>== 구구단 %d단 ==</h1>".formatted(dan));
        for (int i = 1; i <= limit; i++) {
            rq.writer("<div>%d * %d = %d</div>".formatted(dan, i, dan * i));
        }

    }
}

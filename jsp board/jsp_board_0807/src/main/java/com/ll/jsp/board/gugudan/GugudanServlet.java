package com.ll.jsp.board.gugudan;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/gugudan")
public class GugudanServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");

        //?dan=5&limit=12
        String danStr = req.getParameter("dan");
        String limitStr = req.getParameter("limit");

        int dan = Integer.parseInt(danStr); // 구구단의 단을 8로 설정
        int limit = Integer.parseInt(limitStr); // 구구단의 곱셈 범위

        resp.getWriter().append("<h1>== 구구단 %d단 ==</h1>".formatted(dan));
        for (int i = 1; i <= limit; i++) {
            resp.getWriter().append("<div>%d * %d = %d</div>".formatted(dan, i, dan * i));
        }
    }
}

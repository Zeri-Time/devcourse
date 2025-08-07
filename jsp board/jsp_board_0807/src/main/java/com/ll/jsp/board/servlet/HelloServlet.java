package com.ll.jsp.board.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/hello") //이 서블릿은 /hello 경로로 접근할 때 실행됨
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8"); // 들어오는 데이터를 UTF-8로 인코딩
        resp.setCharacterEncoding("UTF-8"); // 응답 데이터를 UTF-8로 인코딩

        resp.setContentType("text/html; charset=UTF-8"); // 브라우저한테 우리가 만든 결과물은 UTF-8로 인코딩 된 HTML 파일임을 알려줌

        resp.getWriter().append("<h1>hello, world!</h1>");
    }
}

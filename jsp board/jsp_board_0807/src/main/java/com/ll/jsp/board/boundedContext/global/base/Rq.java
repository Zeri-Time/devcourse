package com.ll.jsp.board.boundedContext.global.base;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class Rq {
    private final HttpServletRequest req;
    private final HttpServletResponse resp;
    private final HttpSession session;
    private final String sessionAttrName = "loggedInMember";

    public Rq(HttpServletRequest req, HttpServletResponse resp) {
        this.req = req;
        this.resp = resp;
        this.session = req.getSession();

        try {
            req.setCharacterEncoding("UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("UTF-8 인코딩 설정에 실패했습니다.", e);
        }

        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");
    }

    public int getIntParam(String paramName, int defaultValue) {
        String value = getParam(paramName, "");

        if (value == null) {
            return defaultValue;
        }

        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public String getParam(String paramName, String defaultValue) {
        String value = req.getParameter(paramName);

        if (value == null) {
            return defaultValue;
        }

        return value;
    }

    public void print(String str) {
        try {
            resp.getWriter().append(str);
        } catch (IOException e) {
            throw new RuntimeException("응답 작성 중 오류가 발생했습니다.", e);
        }
    }

    public void view(String path) {
        //"/jsp/usr/article/list.jsp" 이런형태로 만들어줌
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("/jsp/" + path + ".jsp");

        try {
            requestDispatcher.forward(req, resp);
        } catch (ServletException e) {
            throw new RuntimeException("뷰로의 포워딩 중 오류가 발생했습니다.", e);
        } catch (IOException e) {
            throw new RuntimeException("뷰로의 포워딩 중 IO 오류가 발생했습니다.", e);
        }
    }

    public void getAttr(String name) {
        req.getAttribute(name);
    }

    public void setAttr(String name, Object value) {
        req.setAttribute(name, value);
    }

    public String getUrlPath() {
        return req.getRequestURI();
    }

    public String getMethod() {
        return req.getMethod();
    }

    public String getActionPath() {
        String[] bits = req.getRequestURI().split("/");

        return "/%s/%s/%s".formatted(bits[1], bits[2], bits[3]);
    }

    public long getLongPathValueByIndex(int index, int defaultValue) {
        String value = getPathValueByIndex(index, null);

        if (value == null) {
            return defaultValue;
        }

        try {
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public String getPathValueByIndex(int index,  String defaultValue) {
        String[] bits = req.getRequestURI().split("/");
        // /usr/article/detail/1
        // ["", "usr", "article", "detail", "1"]
        try {
            return bits[3 + index];
        } catch (ArrayIndexOutOfBoundsException e) {
            return defaultValue;
        }
    }

    public void println(String str) {
        print(str + "\n");
    }

    public  void replace (String msg, String url) {
        println("""
                <script>
                    alert("%s");
                    location.replace("%s");
                </script>
                """.formatted(msg, url));
    }

    public void historyBack(String msg) {
        println("""
                <script>
                    alert("%s");
                    history.back();
                </script>
                """.formatted(msg));
    }

    public void setSessionAttr(String attrName, Object value) {
        session.setAttribute(attrName, value);
    }

    public void removeSessionAttr(String attrName) {
        session.removeAttribute(attrName);
    }

    public boolean hasSessionAttr(String attrName) {
        return session.getAttribute(attrName) != null;
    }

    public void login(Object value) {
        setSessionAttr(sessionAttrName, value);
    }

    public void logout() {
        removeSessionAttr(sessionAttrName);
    }

    public boolean isLogined() {
        return hasSessionAttr(sessionAttrName);
    }

    public boolean isLogout() {
        return !isLogined();
    }

}
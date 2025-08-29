package com.back.global.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class NeedToLogInInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("BeforeActionInterceptor::preHandle 실행됨");

        HttpSession session = request.getSession();
        Integer loggedInMemberId = (Integer) session.getAttribute("loggedInMember");

        boolean isLoggedIn = loggedInMemberId != null;


        // 비회원 접근 경로
        if (isLoggedIn == false) {
            // 한글 세팅
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html;charset=UTF-8");

            // 인터셉터 작동 시 표시할 내용
            response.getWriter().append("로그인 후 이용 바람");

            return false;
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}

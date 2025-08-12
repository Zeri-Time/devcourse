<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- JSP 파일에서 JSTL을 사용하기 위해 taglib 선언-->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../common/header.jspf" %>
<!-- 컨텐츠 영역 -->
<div class="container">
    <h2>로그인</h2>
    <form method="POST" action="/usr/member/login">
        <div class="form-group">
            <label for="username">아이디</label>
            <input type="text" id="username" name="username" placeholder="아이디를 입력해주세요" required>
        </div>
        <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="text" id="password" name="password" placeholder="비밀번호를 입력해주세요" required>
        </div>
        <button type="submit">로그인</button>
    </form>
</div>
<!-- 컨텐츠 영역 -->
<%@ include file="../common/footer.jspf" %>
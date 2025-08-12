<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- JSP 파일에서 JSTL을 사용하기 위해 taglib 선언-->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../common/header.jspf" %>
<!-- 컨텐츠 영역 -->

<div class="container">
    <h2>회원 가입</h2>
    <form method="POST" action="/usr/member/join">
        <div class="form-group">
            <label for="username">아이디</label>
            <input type="text" id="username" name="username" placeholder="아이디를 입력해주세요" required>
        </div>
        <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요" required>
        </div>
        <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" name="name" placeholder="이름을 입력해주세요" required>
        </div>

        <button type="submit">회원가입</button>
    </form>
</div>

<!-- 컨텐츠 영역 -->
<%@ include file="../common/footer.jspf" %>
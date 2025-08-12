<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- JSP 파일에서 JSTL을 사용하기 위해 taglib 선언-->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../common/header.jspf" %>

<div>
    <h1>${article.title}</h1>
    <div>
        <span>번호 : ${article.id}</span>
    </div>

    <div>
        <span>내용 : ${article.content}</span>
    </div>

    <div>
        <span>작성일 : 2025-00-00 00:00</span>
    </div>

    <div>
        <a href="/usr/article/list">목록</a>
    </div>
    <div>
        <a href="/usr/article/modify/${article.id}">수정</a>
    </div>

    <a herf="#" id="deleteLinkBtn">삭제</a>

    <form
            id ="deleteForm"
            action="/usr/article/delete"
            method="POST"
    >
        <input type="hidden" name="deleteId" value="${article.id}" readonly>
    </form>
</div>

<script>
    const deleteLinkBtn = document.getElementById("deleteLinkBtn");
    const deleteForm = document.getElementById("deleteForm");

    deleteLinkBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 링크 동작 방지
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteForm.submit(); // 폼 제출
        }
    })

</script>

<%@ include file="../common/footer.jspf" %>
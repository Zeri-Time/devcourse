<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<script>
    function articleSaveSubmitForm(form) {

        if (form.title.value.trim().length == 0) {
            alert("제목을 입력해주세요.");
            form.title.focus();
            return;
        } else if (form.title.value.trim().length < 3) {
            alert("제목은 두 글자 이상 적어주세요.");
            form.title.focus();
            return;
        }

        if (form.content.value.trim().length == 0) {
            alert("내용을 입력해주세요.");
            form.content.focus();
            return;
        }  else if (form.content.value.trim().length < 3) {
            alert("내용은 두 글자 이상 적어주세요.");
            form.content.focus();
            return;
        }

        form.submit();
    }
</script>

<%@ include file="../common/header.jspf" %>

<div>
    <h2>게시물 작성</h2>

    <form method="POST" onsubmit="articleSaveSubmitForm(this); return false;">
        <div>
            <label for="title">제목</label>
            <input type="text"
                   id="title"
                   name="title"
                   placeholder="제목을 입력해주세요"
                   required>
        </div>

        <div>
            <label for="content">내용</label>
            <textarea id="content"
                      name="content"
                      placeholder="내용을 입력해주세요"
                      required></textarea>
        </div>

        <div>
            <button type="submit" class="submit-btn">게시물 등록</button>
            <button type="button" class="cancel-btn" onclick="history.back()">취소</button>
        </div>
    </form>
</div>

<%@ include file="../common/footer.jspf" %>
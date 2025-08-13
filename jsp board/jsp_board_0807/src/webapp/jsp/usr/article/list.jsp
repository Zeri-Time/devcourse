<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- JSP 파일에서 JSTL을 사용하기 위해 taglib 선언-->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../common/header.jspf" %>

<h1>게시물 리스트</h1>

<div>
    <table border="1">
        <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="articleDto" items="${articleDtoList}" varStatus="status">
            <tr>
                <td>${articleDto.id}</td>
                <td>
                    <a href="/usr/article/detail/${articleDto.id}">${articleDto.title}</a>
                </td>
                <td>
                    ${articleDto.author}
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>

    <a href="/usr/article/write">글쓰기</a>
</div>


<%@ include file="../common/footer.jspf" %>
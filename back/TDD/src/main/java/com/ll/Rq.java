package com.ll;

public class Rq {
    Rq rq = new Rq("목록?keword=자바&keywordType=title&page=2");

rq.getActionName(); // 삭제
rq.getParam("keword", ""); // "자바"
rq.getParamAsInt("keywordType", ""); // "title"
rq.getParamAsInt("page", 1); // 2

rq.getParam("wrongParam", ""); // ""
rq.getParamAsInt("wrongParam", -1); // -1
}

package com.ll.jsp.board.boundedContext.member.dto;


import lombok.*;

import java.math.BigInteger;
import java.util.Map;

@Data
@AllArgsConstructor
public class Member {
    private final long id;
    private  String  username;
    private String password;
    private String name;
    private String regDate;

    public Member(Map<String, Object> row) {
        this.id = ((BigInteger) row.get("id")).longValue();
        this.username = (String) row.get("username");
        this.password = (String) row.get("password");
        this.name = (String) row.get("name");
        this.regDate = row.get("regDate").toString();
    }
}
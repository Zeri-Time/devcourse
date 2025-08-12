package com.ll.jsp.board.boundedContext.member.dto;


import lombok.*;

@Data
@AllArgsConstructor
public class Member {
    private final long id;
    private  String  username;
    private String password;
    private String name;
}
package com.back.domain.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Member {
    private int id;
    private String username;
    private String password;
    private String name;
    private String email;

    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
}
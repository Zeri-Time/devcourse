package com.back.domain.member.member.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
public class Member extends BaseEntity {
    @Column(unique = true)
    private String username;
    private String password;
    @Column(unique = true)
    private String email;

    public Member(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

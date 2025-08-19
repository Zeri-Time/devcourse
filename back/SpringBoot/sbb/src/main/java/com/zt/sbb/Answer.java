package com.zt.sbb;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;

    // Answer 엔티티의 question속성과 Question 엔티티가 서로 연결
    // 실제 데이터베이스에서는 외래키 관계가 생성됨
    @ManyToOne
    private Question question;
}

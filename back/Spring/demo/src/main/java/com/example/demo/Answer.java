package com.example.demo;

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

    // 기본적으로 Eager 모드, LAZY 변경시 fetch = FetchType.LAZY 추가
    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;  // QUESTION_ID 칼럼
}
package com.zt.domain.post.post.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity // 아래 구조대로 DB테이블을 만들어야 한다
//@Table(name="post_list") // 이렇게 테이블 이름을 원하는거로 만들수도 있음
public class Post {
    @Id // PK 라는 뜻. 얘는 무조건 있어야함.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AutoIncrement 라는 뜻


    private int id;
    private String title;
}

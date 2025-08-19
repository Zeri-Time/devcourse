package com.zt.sbb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 여기는 보통 부트스트랩 실행 코드만 작성
// 이 파일은 프로젝트명 + Application.java로 만들면 됨
// 이 싱행 파일에는 항상 @SpringBootApplication 어노테이션이 붙어야함
@SpringBootApplication
public class SbbApplication {
    public static void main(String[] args) {
        SpringApplication.run(SbbApplication.class, args);
    }
}

package com.zt.sbb;

import org.springframework.data.jpa.repository.JpaRepository;

// QuestionRepository 인터페이스를 레포지토리로 만들기 위해 JpaRepository 인터페이스를 상속
public interface QuestionRepository extends JpaRepository<Question, Integer> {

}

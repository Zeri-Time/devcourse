package com.zt.sbb;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class SbbApplicationTest {

    @Autowired
    private QuestionRepository questionRepository;

//    @Test
//    void testJpa() {
//        Question q1 = new Question();
//        q1.setSubject("what's sbb?");
//        q1.setContent("tell me about sbb");
//        q1.setCreateDate(LocalDateTime.now());
//        this.questionRepository.save(q1); // 첫번째 질문 저장
//
//        Question q2 = new Question();
//        q2.setSubject("question about spring boot model");
//        q2.setContent("does id get created automatically?");
//        q2.setCreateDate(LocalDateTime.now());
//        this.questionRepository.save(q2); // 두번째 질문 저장
//    }

//    @Test
//    void testJpa() {
//        List<Question> all = this.questionRepository.findAll();
//        assertEquals(2, all.size()); // 미리 등록한 질문이 2개라서 2
//        // assertEquals(기댓값, 실젯값)
//        // 테스트 해보면 성공
//
//        Question q = all.get(0);
//        assertEquals("what's sbb?", q.getSubject());
//    }

//    @Test
//    void testJpa() {
//        Optional<Question> oq = this.questionRepository.findById(1);
//        if (oq.isPresent()) {
//            Question q = oq.get();
//            assertEquals("what's sbb?", q.getSubject());
//        }
//    }

    @Test
    void testJpa() {
        Question q = this.questionRepository.findBySubjectAndContent("what's sbb?", "tell me about sbb");
        assertEquals(1, q.getId());
    }

}

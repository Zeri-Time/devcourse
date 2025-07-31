package com.ll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class RqTest {
    @Test
    @DisplayName("rq.getActionName()")
    void t1() {
        Rq rq = new Rq("수정?id=1");
        String actionname = rq.getActionName();

        assertEquals("수정" + actionname);
    }
}

package com.ll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {
    @Test
    @DisplayName("0 + 5 == 5")
    void t1() {
        App app = new App();
        int rs = app.plus(0, 5);

        assertEquals(5, rs);
    }
}

package com.zt.framework.ioc;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class ApplicationContext {
    private static ApplicationContext applicationContext;

    @BeforeAll
    public static void beforeAll(){
       ApplicationContext applicationContext1 = new ApplicationContext("com.zt");
       applicationContext1.init();
    }

    @Test
    @DisplayName("ApplicationContext 객체 생성")
    public void t1(){
        System.out.println(applicationContext);
    }
}

package com.zt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ContorollerBeanAop0821Application {

    public static void main(String[] args) {
        SpringApplication.run(ContorollerBeanAop0821Application.class, args);
    }

}

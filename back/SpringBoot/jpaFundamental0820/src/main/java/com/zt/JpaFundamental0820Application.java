package com.zt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JpaFundamental0820Application {

    public static void main(String[] args) {
        SpringApplication.run(JpaFundamental0820Application.class, args);
    }

}

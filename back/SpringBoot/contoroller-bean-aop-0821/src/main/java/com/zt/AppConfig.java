package com.zt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class AppConfig {
    @Autowired
    @Lazy
    private AppConfig self;

    @Bean
    PersonRepository personRepository() {
        return new PersonRepository(1);
    }

    @Bean
    int version() {
        return 3;
    }

    @Bean
    public ApplicationRunner myApplicationRunner() {
        return new ApplicationRunner() {
            @Override
            public void run (ApplicationArguments args) throws Exception {
                System.out.println("myApplicationRunner is running");
            }
        };
    }

    @Bean
    public ApplicationRunner myApplicationRunner2() {
        return args -> {
            self.work1();
            self.work2();
        };
    }

    private void work1() {
        System.out.println("work1");
    }

    private void work2() {
        System.out.println("work2");
    }
}
package com.zt.global.initData;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BaseInitData {

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {

        };
    }
}

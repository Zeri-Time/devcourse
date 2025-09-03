package com.back.global.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 요청별 권한 설정
                .authorizeHttpRequests((
                                auth -> auth
                                        .requestMatchers("/**").permitAll()
                        )
                )
                .csrf(csrf -> csrf
                        // H2 콘솔 접근 시 CSRF 예외 처리
                        .ignoringRequestMatchers("/h2-console/**")
                )
                .headers(headers -> headers
                        // H2 콘솔은 frame 사용 → sameOrigin 허용
                        .frameOptions(frame -> frame.sameOrigin())
                )
                .formLogin(
                        form -> form
                                .loginPage("/members/login")
                                .defaultSuccessUrl("/posts/list", true)
                )
                .logout(
                        logout -> logout
                                .logoutUrl("/members/logout")
                                .logoutSuccessUrl("/members/login")
                );
        return http.build();
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
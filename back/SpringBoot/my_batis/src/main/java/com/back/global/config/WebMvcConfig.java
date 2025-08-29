package com.back.global.config;

import com.back.global.interceptor.BeforeActionInterceptor;
import com.back.global.interceptor.NeedToLogInInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final BeforeActionInterceptor beforeActionInterceptor;
    private final NeedToLogInInterceptor needToLogInInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration registration;

        registration = registry.addInterceptor(beforeActionInterceptor);

        // 전체 요청에 대한 인터셉터
        registration.addPathPatterns("/**");
        // 여기 접근할때는 인터셉터 작동 x (제외)
        registration.excludePathPatterns("/resources/**");
        registration.excludePathPatterns("/error");
        registration.excludePathPatterns("/favicon.ico");

        registration = registry.addInterceptor(needToLogInInterceptor);
        registration.addPathPatterns("/posts/write");
    }
}

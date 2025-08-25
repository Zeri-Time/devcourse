package com.zt.global.initData;

import com.zt.domain.wiseSaying.service.WiseSayingService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class BaseInitData {
    private final WiseSayingService wiseSayingService;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            if (wiseSayingService.count() > 0 ) return;

            wiseSayingService.write("명언 1", "작가 1");
            wiseSayingService.write("명언 2", "작가 2");
            wiseSayingService.write("명언 3", "작가 3");
            wiseSayingService.write("명언 4", "작가 4");
            wiseSayingService.write("""
                    - 하루 30분 운동을 해라
                    - 잠은 7시간 이상 자라
                    - 매일 30분 독서를 해라
                    """, "작가 5");
        };
    }
}
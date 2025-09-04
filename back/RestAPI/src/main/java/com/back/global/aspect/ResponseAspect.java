package com.back.global.aspect;

import com.back.global.rsData.RsData;
import jakarta.servlet.http.HttpServletResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ResponseAspect {
    private final HttpServletResponse response;

    public ResponseAspect(HttpServletResponse response) {
        this.response  = response;
    }

    @Around("""
                (
                    within(@org.springframework.web.bind.annotation.RestController *) &&
                    (
                        @annotation(org.springframework.web.bind.annotation.GetMapping) ||
                        @annotation(org.springframework.web.bind.annotation.PostMapping) ||
                        @annotation(org.springframework.web.bind.annotation.PutMapping) ||
                        @annotation(org.springframework.web.bind.annotation.DeleteMapping) ||
                        @annotation(org.springframework.web.bind.annotation.RequestMapping)
                    )
                ) ||
                @annotation(org.springframework.web.bind.annotation.ResponseBody)
            """)
    public Object handleResponse(ProceedingJoinPoint joinPoint) throws Throwable {
        // 원래 대상 메서드를 실행
        Object proceed = joinPoint.proceed();

        // 반환객체가 RsData 타입일 경우
        if (proceed instanceof RsData) {
            RsData<?> rsData = (RsData<?>) proceed;

            // RsData가 가진 statusCode() 값을 HTTP 응답 상태 코드로 변경
            response.setStatus(rsData.statusCode());
        }
        // 컨트롤러의 원래 반환값 그대로 반환
        return proceed;
    }
}

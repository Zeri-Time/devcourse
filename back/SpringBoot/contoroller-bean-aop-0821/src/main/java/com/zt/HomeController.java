package com.zt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequiredArgsConstructor
@Controller
public class HomeController {
    private final  PersonService personService;

    @GetMapping("/")
    @ResponseBody
    public String main() {
        long count = personService.count();

        return "main // 사람 수 : %d".formatted(count);
    }
}

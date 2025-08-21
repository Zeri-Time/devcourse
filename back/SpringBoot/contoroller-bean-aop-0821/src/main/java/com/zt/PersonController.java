package com.zt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequiredArgsConstructor
@Controller
public class PersonController {
    private final PersonService personService;

    @ResponseBody
    @GetMapping("/people")
    public String people() {
        long count = personService.count();
        return "people // 사람수 : %d".formatted(count);
    }
}

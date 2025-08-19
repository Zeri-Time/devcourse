package com.zt.sbb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    @GetMapping("/")
    @ResponseBody
    public String root() {
        return "Root Page";
    }

    @GetMapping("/hello")
    @ResponseBody
    public String hello() {
        return "Hello World";
    }

//    @GetMapping("/sbb")
//    @ResponseBody
//    public String greeting() {
//        return "welcome to sbb";
//    }
}

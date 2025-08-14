package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    @ResponseBody
    @GetMapping("/")
    public String index() {
        return "demo";
    }

    @ResponseBody
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}

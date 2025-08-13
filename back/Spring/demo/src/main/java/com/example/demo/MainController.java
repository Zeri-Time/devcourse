package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;

public class MainController {
    @GetMapping("/")
    public void index() {
        System.out.println("index 메서드 호출됨");
    }
    
    @GetMapping("/hello")
    public void hello() {
        System.out.println("hello 메서드 호출됨");
    }
}

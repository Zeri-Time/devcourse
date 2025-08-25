package com.zt.domain.wiseSaying.controller;

import com.zt.domain.wiseSaying.entity.WiseSaying;
import com.zt.domain.wiseSaying.service.WiseSayingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Controller
public class WiseSayingController {
    private final WiseSayingService wiseSayingService;

    @GetMapping("/wiseSayings/write")
    @ResponseBody
    public String write(
            @RequestParam(defaultValue = "내용") String content,
            @RequestParam(defaultValue = "작가") String author
    ) {

        if (content.isBlank()) {
            throw new IllegalArgumentException("content is empty");
        }

        if (author.isBlank()) {
            throw  new IllegalArgumentException("author is empty");
        }

        WiseSaying wiseSaying = wiseSayingService.write(content, author);

        return "%d번 명언이 생성되었습니다.".formatted(wiseSaying.getId());
    }

    @GetMapping("/wiseSayings")
    @ResponseBody
    public String list() {
        return "<ul>"
                + wiseSayingService.findAll()
                .stream()
                .map(wiseSaying ->
                        "<li>%d / %s / %s </li>".formatted(wiseSaying.getId(), wiseSaying.getContent(), wiseSaying.getAuthor())
                )
                .collect(Collectors.joining(""))
                + "</ul>";
    }


    @GetMapping("/wiseSayings/{id}")
    @ResponseBody
    public String detail(@PathVariable int id) {
        WiseSaying wiseSaying = wiseSayingService.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("%d번 명언은 존재하지 않습니다.".formatted(id))
                );

        return """
                <h1>번호 : %d</h1>
                <div>명언 : %s</div>
                <div>작가 : %s</div>
                """.formatted(wiseSaying.getId(), wiseSaying.getContent(), wiseSaying.getAuthor());
    }


    @GetMapping("/wiseSayings/{id}/delete")
    @ResponseBody
    public String delete(@PathVariable int id) {
        WiseSaying wiseSaying = wiseSayingService.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("%d번 명언은 존재하지 않습니다.".formatted(id))
                );

        wiseSayingService.delete(wiseSaying);

        return "%d 번 명언이 삭제되었습니다.".formatted(id);
    }

    @GetMapping("/wiseSayings/{id}/modify")
    @ResponseBody
    public String modify(
            @PathVariable int id,
            @RequestParam(defaultValue = "") String content,
            @RequestParam(defaultValue = "") String author
    ) {
        if (content.isBlank()) {
            throw new IllegalArgumentException("content is empty");
        }

        if (author.isBlank()) {
            throw  new IllegalArgumentException("author is empty");
        }

        WiseSaying wiseSaying = wiseSayingService.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("%d번 명언은 존재하지 않습니다.".formatted(id))
                );

        wiseSayingService.modify(wiseSaying, content, author);

        return "%d 번 명언이 수정되었습니다.".formatted(id);
    }
}
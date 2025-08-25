package com.zt.domain.wiseSaying.controller;

import com.zt.domain.wiseSaying.entity.WiseSaying;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class WiseSayingController {
    private int lastId = 0;
    private final List<WiseSaying> wiseSayings = new ArrayList<>() {{
        add(new WiseSaying(++lastId, "명언 1", "작가 1"));
        add(new WiseSaying(++lastId, "명언 2", "작가 2"));
        add(new WiseSaying(++lastId, "명언 3", "작가 3"));
        add(new WiseSaying(++lastId, "명언 4", "작가 4"));
        add(new WiseSaying(++lastId, "명언 5", "작가 5"));
    }};

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

        int id = ++lastId;

        WiseSaying wiseSaying = new WiseSaying(id, content, author);

        wiseSayings.add(wiseSaying);

        return "%d번 명언이 생성되었습니다.".formatted(id);
    }

    @GetMapping("/wiseSayings")
    @ResponseBody
    public String list() {
        return "<ul>"
                + wiseSayings
                .stream()
                .map(wiseSaying ->
                        "<li>%d / %s / %s </li>".formatted(wiseSaying.getId(), wiseSaying.getContent(), wiseSaying.getAuthor())
                )
                .collect(Collectors.joining(""))
                + "</ul>";
    }

    @GetMapping("/wiseSayings/delete/{id}")
    @ResponseBody
    public String delete(@PathVariable int id) {
        WiseSaying wiseSaying = findById(id)
                .orElseThrow(() -> new IllegalArgumentException("%d번 명언은 존재하지 않습니다.".formatted(id))
                );

        wiseSayings.remove(wiseSaying);

        return "%d 번 명언이 삭제되었습니다.".formatted(id);
    }

    @GetMapping("/wiseSayings/modify/{id}")
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

        WiseSaying wiseSaying = findById(id)
                .orElseThrow(() -> new IllegalArgumentException("%d번 명언은 존재하지 않습니다.".formatted(id))
                );

        wiseSaying.modify(content, author);

        return "%d 번 명언이 수정되었습니다.".formatted(id);
    }

    private Optional<WiseSaying> findById(int id) {
        return wiseSayings
                .stream()
                .filter(wiseSaying -> wiseSaying.getId() == id)
                .findFirst();
    }
}
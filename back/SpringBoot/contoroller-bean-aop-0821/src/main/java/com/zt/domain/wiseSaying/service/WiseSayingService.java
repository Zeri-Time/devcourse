package com.zt.domain.wiseSaying.service;

import com.zt.domain.wiseSaying.entity.WiseSaying;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WiseSayingService {
    private int lastId = 0;
    private final List<WiseSaying> wiseSayings = new ArrayList<>() {{
        add(new WiseSaying(++lastId, "명언 1", "작가 1"));
        add(new WiseSaying(++lastId, "명언 2", "작가 2"));
        add(new WiseSaying(++lastId, "명언 3", "작가 3"));
        add(new WiseSaying(++lastId, "명언 4", "작가 4"));
        add(new WiseSaying(++lastId, "명언 5", "작가 5"));
    }};

    public WiseSaying write(String content, String author) {
        int id = ++lastId;

        WiseSaying wiseSaying = new WiseSaying(id, content, author);

        wiseSayings.add(wiseSaying);

        return wiseSaying;
    }

    public List<WiseSaying> findAll() {
        return wiseSayings;
    }

    public Optional<WiseSaying> findById(int id) {
        return wiseSayings
                .stream()
                .filter(wiseSaying -> wiseSaying.getId() == id)
                .findFirst();
    }

    public void delete(WiseSaying wiseSaying) {
        wiseSayings.remove(wiseSaying);
    }

    public void modify(WiseSaying wiseSaying, String content, String author) {
        wiseSaying.modify(content, author);
    }
}

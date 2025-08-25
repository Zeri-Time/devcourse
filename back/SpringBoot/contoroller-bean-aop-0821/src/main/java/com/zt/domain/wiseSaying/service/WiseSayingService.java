package com.zt.domain.wiseSaying.service;

import com.zt.domain.wiseSaying.entity.WiseSaying;
import com.zt.domain.wiseSaying.repository.WiseSayingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class WiseSayingService {
    private final WiseSayingRepository wiseSayingRepository;

    public WiseSaying write(String content, String author) {
        WiseSaying wiseSaying = new WiseSaying(content, author);
        wiseSayingRepository.save(wiseSaying);
        return wiseSaying;
    }

    public List<WiseSaying> findAll() {
        return wiseSayingRepository.findAll();
    }

    public Optional<WiseSaying> findById(int id) {
        return wiseSayingRepository.findById(id);
    }

    public void delete(WiseSaying wiseSaying) {
        wiseSayingRepository.delete(wiseSaying);
    }

    public void modify(WiseSaying wiseSaying, String content, String author) {
        wiseSaying.modify(content, author);

        wiseSayingRepository.save(wiseSaying);
    }

    public long count() {
        return wiseSayingRepository.count();
    }
}


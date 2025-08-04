package Saying.domain.wiseSaying;


import Saying.WiseSaying;

import java.util.List;

public class WiseSayingService {
    private final WiseSayingRepository wiseSayingRepository = AppContext.wiseSayingRepository;

    public List<WiseSaying> getWiseSayingList() {
        return this.wiseSayingRepository.getWiseSayingList();
    }

    public void delete(WiseSaying wiseSaying) {
        this.wiseSayingRepository.delete(wiseSaying);
    }

    void modify(WiseSaying wiseSaying, String content, String author) {
        wiseSaying.setAuthor(author);
        wiseSaying.setContent(content);
        this.wiseSayingRepository.save(wiseSaying);
    }

    WiseSaying findById(int id) {
        return this.wiseSayingRepository.findById(id);
    }

    public WiseSaying write(String author, String content) {
        WiseSaying wiseSaying = new WiseSaying(author, content);

        this.wiseSayingRepository.save(wiseSaying);

        return wiseSaying;
    }
}
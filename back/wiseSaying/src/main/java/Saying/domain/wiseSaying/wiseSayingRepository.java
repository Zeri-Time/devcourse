package Saying.domain.wiseSaying;

import Saying.WiseSaying;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class WiseSayingRepository {
    private  final List<WiseSaying> wiseSayingList = new ArrayList<>();
    int lastId = 0;

    public List<WiseSaying> getWiseSayingList() {
        return wiseSayingList;
    }

    public void delete(WiseSaying wiseSaying) {
        wiseSayingList.remove(wiseSaying);
    }

    WiseSaying findById(int id) {
        return wiseSayingList.stream()
                .filter(ws -> ws.getId() == id)
                .findFirst()
                .orElseGet(() -> {
                    System.out.println("해당 아이디는 존재하지 않습니다.");
                    return null;
                });
    }

    public void save(WiseSaying wiseSaying) {
        LocalDateTime now = LocalDateTime.now();
        // 등록
        if (wiseSaying.isNew()) {
            wiseSaying.setId(++lastId);
            wiseSaying.setCreateDate(now);
            wiseSaying.setModifyDate(now);
            wiseSayingList.add(wiseSaying);
        } else { // 수정
            wiseSaying.setModifyDate(now);
        }
    }
}

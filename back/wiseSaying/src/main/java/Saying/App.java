package Saying;

import Saying.domain.system.SystemController;
import Saying.domain.wiseSaying.WiseSayingController;

public class App {
    void run() {
        System.out.println("== 명언 앱 ==");

        SystemController systemController = AppContext.systemController;
        WiseSayingController wiseSayingController = AppContext.wiseSayingController;

        while (true) {
            System.out.print("명령) ");
            String cmd = AppContext.scanner.nextLine().trim();

            Rq rq = new Rq(cmd);

            switch (rq.getActionName()) {
                case "종료" -> {
                    systemController.actionExit();
                    return;
                }
                case "등록" -> wiseSayingController.actionWrite();
                case "목록" ->  wiseSayingController.actionList();
                case "삭제" -> wiseSayingController.actionDelete(rq);
                case "수정" -> wiseSayingController.actionModify(rq);
            }
        }
    }
}
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("명언 앱");

        int id = 1;

        List<String> sayingList = new ArrayList<>();

        while (true) {

            String cmd = scanner.nextLine();


            if (cmd.equals("end")) {
                break;
            } else if (cmd.equals("list")) {
                System.out.println(sayingList);
            }


            System.out.println("명언: ");
            String saying = scanner.nextLine().trim();
            sayingList.add(saying);
            System.out.println("작가: ");
            String author = scanner.nextLine().trim();
            sayingList.add(author);

            System.out.println("명언: " + saying);
            System.out.println("작가: " + author);

            System.out.println(id + "번 명언이 등록되었습니다.");

            sayingList.add(String.valueOf(id));
            id++;

        }
        scanner.close();

    }
}

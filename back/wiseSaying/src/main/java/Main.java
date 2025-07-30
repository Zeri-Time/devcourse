import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("명언 앱");

        while (true) {

            String cmd = scanner.nextLine();

            if (cmd.equals("종료")) {
                break;
            }

            System.out.println("명언: ");
            String saying = scanner.nextLine().trim();
            System.out.println("작가: ");
            String author = scanner.nextLine().trim();

            System.out.println("명언: " + saying);
            System.out.println("작가: " + author);

            System.out.println("1번 명언이 등록되었습니다.");

        }
        scanner.close();
    }
}

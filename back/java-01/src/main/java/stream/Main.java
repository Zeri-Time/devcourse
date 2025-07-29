package stream;

import java.util.function.IntConsumer;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        System.out.println("비스트림");
        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
        }

        System.out.println("스트림 v1 (no lamda)");
        IntStream.rangeClosed(1, 10).forEach(
                new IntConsumer() {
                    @Override
                    public void accept(int value) {
                        System.out.println(value);
                    }
                }
        );

        System.out.println("스트림 v2 (use lamda)");
        IntStream.rangeClosed(1, 10).forEach(
                (int value) -> {
                    System.out.println(value);
                }
        );

        System.out.println("스트림 v3 (매개변수 타입 생략");
        IntStream.rangeClosed(1, 10).forEach((value) -> {
            System.out.println(value);
        });

        System.out.println("스트림 v4 (매개변수 괄호 생략");
        IntStream.rangeClosed(1, 10).forEach(value -> {
            System.out.println(value);
        });

        System.out.println("스트림 v5 (메서드 바디 중괄호 생략");
        IntStream.rangeClosed(1, 10).forEach(value -> {
            System.out.println(value);
        });

        System.out.println("스트림 v6 (최종 축약형");
        IntStream.rangeClosed(1, 10).forEach(System.out::println);
    }
}

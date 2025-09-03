package com.ll;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
//        lab1();
//        lab2();
    }

    public static void lab1 () {
        String input = """
                등록
                안녕!!
                """;

        Scanner scanner = new Scanner(input);

        String cmd = scanner.nextLine();
        String content = scanner.nextLine();
        System.out.println("cmd : " + cmd);
        System.out.println("content : " + content);
    }

    public static void lab2() {
        System.out.println("안녕하세요.");

        // 기존의 output 스트림 저장
        PrintStream ORIGINAL_OUT = System.out;

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PrintStream printStream = new PrintStream(byteArrayOutputStream, true);
        System.setOut(printStream);

        System.out.println("반갑습니다.");
        String str1 = byteArrayOutputStream.toString();

        System.out.println("좋아요. 하하");
        String str2 = byteArrayOutputStream.toString();

        // 기존의 output 스트림 복원
        System.setOut(ORIGINAL_OUT);
        printStream.close();

        System.out.println("str1 : " + str1);
        System.out.println("str2 : " + str2);
    }
}
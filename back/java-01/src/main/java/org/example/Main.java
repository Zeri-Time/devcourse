package org.example;

// 부모 클래스
class Animal {
    String name;

    void eat() {
        System.out.println("음식을 먹습니다");
    }

    void sleep() {
        System.out.println("잠을 잡니다");
    }
}

// 자식 클래스
class Dog extends Animal {
    // Animal의 모든 특성을 상속받음

    // 추가로 새로운 메소드 정의 가능
    void bark() {
        System.out.println("멍멍!");
    }
}

class 사람 extends 동물 {

}

class 동물 {
    void 숨쉬다() {
        System.out.println("숨쉬다.");
    }
}

public class Main {
    public static void main(String[] args) {
        Character user1 = new Character();
        user1.no = 1;
        user1.level = 20;
        user1.power = 400;

        사람 a사람 = new 사람();
        a사람.숨쉬다();

        Dog myDog = new Dog();

        // 부모 클래스(Animal)의 메소드 사용
        myDog.name = "바둑이";  // Animal의 필드 사용
        myDog.eat();    // Animal의 메소드 사용
        myDog.sleep();  // Animal의 메소드 사용

        // 자식 클래스(Dog)의 고유 메소드 사용
        myDog.bark();

    }

    static class Character {
        int no;
        int level;
        int power;
    }


}









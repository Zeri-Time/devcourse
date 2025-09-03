package practice._01;

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("둘리", 10);
        s1.sayInfo();
    }
}

class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void sayInfo() {
        System.out.println(name + "의 나이는" + age);


    }
}



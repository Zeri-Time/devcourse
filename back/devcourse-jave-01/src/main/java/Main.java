public class Main {
    public static void main(String[] args) {
        // System.out 여기서 . 은 of 를 의미 합니다.
        // System.out.println(100); // 여기서 println(100); 와 같은 형태는 타 동사를 의미합니다.
        // System.out.println(100); // 여기서 System.out 은 주어를 의미 합니다.
        // System.out.println(100); // 여기서 100은 목적어 또는 보어 입니다.
        // System.out.println(100); // 개발자가 "System.out" 라는 녀석에게 100 을 println 하라는 의미

        // 프로그램의 시작점
//        System.out.println(1); // 실행순서 1 : 숫자는 " 로 감싸지 않아도 됩니다.
//        System.out.println("2");
//        System.out.println("3");
//        System.out.println("사");
        // 프로그램의 끝점

        //변수 선언
//        int x;
//        x = 10;
//        x += x;
//        System.out.println(x);

        //조건문
        int age = 50;

        System.out.println("당신의 나이 : " + age);
// 당신의 나이 : 50

        if (age >= 20) { // age >= 20 (은)는 결국 실행되면 true 가 된다.
            System.out.println("성년");
        }

        if (age < 20) { // age < 20 (은)는 결국 실행되면 false 가 된다.
            System.out.println("미성년");
        }
        //if else문
//        if (age >= 20) { // age >= 20 (은)는 결국 실행되면 true 가 된다.
//            System.out.println("성년");
//        } else { // age < 20 (은)는 결국 실행되면 false 가 된다.
//            System.out.println("미성년");
//        }

        // == : 같다.
        // != : 다르다.

        if (10 > 20 || 1 != 1 || 3 > 2) {
            // 실행?
        }

//        1 단계:
//        10 > 20 || 1 != 1 || 3 > 2
//        2 단계:
//        false || 1 != 1 || 3 > 2
//        3 단계:
//        false || false || 3 > 2
//        4 단계:
//        false || 3 > 2  // 3단계 앞에 있던 false || false 의 연산결과로 false 가 된다.
//        5 단계:
//        false || true
//        6 단계:
//        true

        int x = 1;
        if(x > 0) {
            System.out.println("true");
        }

    }

}

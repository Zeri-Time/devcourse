package practice._03;

public class Car {
    int speed;

    void turnOn() {
        System.out.println("시동 걸기");
    }

    void run() {
        for(int i = 10; i <= 50; i+=10){
            speed = i;
            System.out.println("달리기.(시속:" + speed + "km/h");
        }
    }
}

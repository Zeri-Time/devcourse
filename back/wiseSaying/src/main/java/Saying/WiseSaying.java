package Saying;

public class WiseSaying {
    private final  int id;
    private String author;
    private String content;

    WiseSaying (int id, String author, String content) {
        this.id = id;
        this.author = author;
        this.content = content;
    }

    int getId() {
        return this.id;
    }

    String getAuthor() {
        return this.author;
    }

    String getContent() {
        return this.content;
    }

    void setAuthor(String author) {
        this.author = author;
    }

    void setContent(String content) {
        this.content = content;
    }
}
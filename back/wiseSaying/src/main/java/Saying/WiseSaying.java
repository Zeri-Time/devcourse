package Saying;

import Saying.domain.AppContext;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class WiseSaying {
    private int id;
    private String author;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private static DateTimeFormatter forPrintDateTimeFormatter = AppContext.forPrintDateTimeFormatter;

    public WiseSaying(String author, String content) {
        this.author = author;
        this.content = content;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return this.author;
    }

    public String getContent() {
        return this.content;
    }

    public LocalDateTime getCreateDate() {
        return this.createDate;
    }

    public LocalDateTime getModifyDate() {
        return this.modifyDate;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public void setModifyDate(LocalDateTime modifyDate) {
        this.modifyDate = modifyDate;
    }

    public boolean isNew() {
        return getId() == 0;
    }

    public String getForPrintCreateDate() {
        return createDate.format(forPrintDateTimeFormatter);
    }

    public String getForPrintModifyDate() {
        return modifyDate.format(forPrintDateTimeFormatter);
    }
}
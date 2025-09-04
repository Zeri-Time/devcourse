package com.back.global.rsData;

public record RsData<T>(String resultCode, int statusCode, String msg, T data) {
    public RsData(String resultCode, String msg) {
        this(resultCode, msg, null);
    }

    public RsData(String resultCode, String msg, T data) {
        this(resultCode, Integer.parseInt(resultCode.split("-", 2)[0]), "", data);
    }
}
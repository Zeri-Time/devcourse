package com.zt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PersonRepository {
    private final int version;
    private long i;

    public long count() {
        System.out.println("PersonRepository version : %d".formatted(version));
        return i++;
    }
}
package com.zt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository personRepository;

    public long count() {
        return personRepository.count();
    }
}
package com.zt.domain.wiseSaying.repository;

import com.zt.domain.wiseSaying.entity.WiseSaying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WiseSayingRepository extends JpaRepository<WiseSaying, Integer> {

}
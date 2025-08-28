package com.back.domain.member.repository;

import com.back.domain.member.dto.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberRepository {
    List<Member>findAll();

    Member findById(int id);

    Member findByUsername(String username);

    int save(Member member);

    int deleteById(int id);

    int update(
            @Param("id") int id,
            @Param("username") String username,
            @Param("password") String password,
            @Param("name") String name,
            @Param("email") String email
    );
}
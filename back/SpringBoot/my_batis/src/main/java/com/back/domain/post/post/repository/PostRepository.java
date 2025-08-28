package com.back.domain.post.post.repository;

import com.back.domain.post.post.dto.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostRepository {

    List<Post> findAll();

    List<Post> findAllOrdered(
            @Param("orderBy") String orderBy,
            @Param("orderByDirection") String orderByDirection
    );

    Post findById(int id);

    int create(Post post);

    void createV2(
            @Param("title") String title,
            @Param("content") String content
    );

    int getLastInsertId();

    int deleteById(int id);

    int update(
            @Param("id") int id,
            @Param("title") String title,
            @Param("content") String content
    );

    List<Post> search(
            @Param("kwType") String kwType,
            @Param("kw") String kw
    );

    int deleteByIds(@Param("ids") List<Integer> ids);
}
package com.back.domain.post.post.repository;

import com.back.domain.post.post.dto.PostWithAuthor;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostWithAuthorRepository {
    List<PostWithAuthor> findAllWithAuthor();
    PostWithAuthor findByIdWithAuthor(int id);
}
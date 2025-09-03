package com.back.domain.post.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record WriteForm (
        @NotBlank(message = "제목을 입력해주세요.")
        @Size(min = 2, max = 20, message = "제목은 2 ~ 10 자 이내로 입력해주세요.")
        String title,

        @NotBlank(message = "내용을 입력해주세요.")
        @Size(min = 2, max = 100, message = "내용은 2 ~ 100 자 이내로 입력해주세요.")
        String content
) {}
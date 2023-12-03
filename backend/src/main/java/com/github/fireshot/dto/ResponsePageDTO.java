package com.github.fireshot.dto;

import org.springframework.data.domain.Page;

public class ResponsePageDTO<T> extends ResponseDTO<Page<T>> {
    public ResponsePageDTO(int statusCode, String message, Page<T> body) {
        super(statusCode, message, body);
    }

    public ResponsePageDTO(int statusCode, String message) {
        super(statusCode, message, null);
    }
}

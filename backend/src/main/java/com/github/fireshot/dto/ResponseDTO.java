package com.github.fireshot.dto;

import org.springframework.http.HttpStatusCode;

public record ResponseDTO<T>(HttpStatusCode statusCode, String message, T body) {
    public ResponseDTO(HttpStatusCode statusCode, String message) {
        this(statusCode, message, null);
    }
}

package com.github.fireshot.dto;

import java.util.Set;

public class ResponseSetDTO<T> extends ResponseDTO<Set<T>> {
    public ResponseSetDTO(int statusCode, String message, Set<T> body) {
        super(statusCode, message, body);
    }

    public ResponseSetDTO(int statusCode, String message) {
        super(statusCode, message, null);
    }
}

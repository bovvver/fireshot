package com.github.fireshot.dto;

import java.util.HashMap;
import java.util.Map;

public record ResponseDTO<T>(int statusCode, String message, Map<String, T> data) {
    public ResponseDTO(int statusCode, String message) {
        this(statusCode, message, new HashMap<>());
    }
}

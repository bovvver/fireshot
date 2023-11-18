package com.github.fireshot.dto;

import java.util.Map;

public class ResponseMapDTO extends ResponseDTO<Map<String, String>> {
    public ResponseMapDTO(int statusCode, String message, Map<String, String> body) {
        super(statusCode, message, body);
    }

    public ResponseMapDTO(int statusCode, String message) {
        super(statusCode, message, null);
    }
}

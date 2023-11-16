package com.github.fireshot.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO<T> {
    int statusCode;
    String message;
    T body;

    public ResponseDTO(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.body = null;
    }
}

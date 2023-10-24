package com.github.fireshot.exceptions;

import com.github.fireshot.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(value = UserAlreadyExistsException.class)
    public ResponseEntity<ResponseDTO<Object>> handleUserAlreadyExistsException() {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(HttpStatus.CONFLICT.value(), "User with this e-mail already exists.");
        return new ResponseEntity<>(responseDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<ResponseDTO<Object>> handleBadCredentialsException() {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(HttpStatus.UNAUTHORIZED.value(), "E-mail or password is incorrect. Please try again.");
        return new ResponseEntity<>(responseDTO, HttpStatus.UNAUTHORIZED);
    }
}

package com.github.fireshot.exceptions;

import com.github.fireshot.dto.ExceptionDTO;
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
    public ResponseEntity<ExceptionDTO> handleUserAlreadyExistsException() {
        ExceptionDTO exceptionDTO = new ExceptionDTO(HttpStatus.CONFLICT.value(), "User with this e-mail already exists.");
        return new ResponseEntity<>(exceptionDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<ExceptionDTO> handleBadCredentialsException() {
        ExceptionDTO exceptionDTO = new ExceptionDTO(HttpStatus.UNAUTHORIZED.value(), "E-mail or password is incorrect. Please try again.");
        return new ResponseEntity<>(exceptionDTO, HttpStatus.UNAUTHORIZED);
    }
}

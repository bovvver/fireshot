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
    public ResponseEntity<ResponseDTO<Object>> handleUserAlreadyExistsException(UserAlreadyExistsException exception) {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(HttpStatus.CONFLICT.value(), exception.getMessage());
        return new ResponseEntity<>(responseDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<ResponseDTO<Object>> handleBadCredentialsException(BadCredentialsException exception) {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(HttpStatus.UNAUTHORIZED.value(), exception.getMessage());
        return new ResponseEntity<>(responseDTO, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = RegistrationValidationException.class)
    public ResponseEntity<ResponseDTO<Object>> handleRegistrationValidationException(RegistrationValidationException exception) {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
    }
}

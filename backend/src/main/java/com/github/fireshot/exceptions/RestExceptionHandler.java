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
        return finishExceptionHandling(HttpStatus.CONFLICT, exception);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<ResponseDTO<Object>> handleBadCredentialsException(BadCredentialsException exception) {
        return finishExceptionHandling(HttpStatus.UNAUTHORIZED, exception);
    }

    @ExceptionHandler(value = RegistrationValidationException.class)
    public ResponseEntity<ResponseDTO<Object>> handleRegistrationValidationException(RegistrationValidationException exception) {
        return finishExceptionHandling(HttpStatus.BAD_REQUEST, exception);
    }

    @ExceptionHandler(value = PhotoUploadException.class)
    public ResponseEntity<ResponseDTO<Object>> handlePhotoUploadException(PhotoUploadException exception) {
        return finishExceptionHandling(HttpStatus.INTERNAL_SERVER_ERROR, exception);
    }

    private ResponseEntity<ResponseDTO<Object>> finishExceptionHandling(HttpStatus status, RuntimeException exception) {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(status.value(), exception.getMessage());
        return new ResponseEntity<>(responseDTO, status);
    }
}

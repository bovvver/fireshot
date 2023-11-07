package com.github.fireshot.exceptions;

import com.github.fireshot.auth.AuthService;
import com.github.fireshot.dto.ResponseDTO;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
@AllArgsConstructor
public class RestExceptionHandler {
    public AuthService authService;

    @ExceptionHandler(value = UserAlreadyExistsException.class)
    public ResponseEntity<ResponseDTO<Object>> handleUserAlreadyExistsException(UserAlreadyExistsException exception) {
        return finishExceptionHandling(HttpStatus.CONFLICT, exception);
    }

    @ExceptionHandler(value = AuthenticationException.class)
    public ResponseEntity<ResponseDTO<Object>> handleBadCredentialsException(AuthenticationException exception) {
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

    @ExceptionHandler(value = ExpiredJwtException.class)
    public ResponseEntity<ResponseDTO<Object>> handleExpiredJwtException(ExpiredJwtException exception) {
        return finishExceptionHandling(HttpStatus.UNAUTHORIZED, exception);
    }

    @ExceptionHandler(value = SignatureException.class)
    public ResponseEntity<ResponseDTO<String>> handleSignatureException() {
        return authService.logout();
    }

    private ResponseEntity<ResponseDTO<Object>> finishExceptionHandling(HttpStatus status, RuntimeException exception) {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(status.value(), exception.getMessage());
        return new ResponseEntity<>(responseDTO, status);
    }
}

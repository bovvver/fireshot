package com.github.fireshot.exceptions;

import com.github.fireshot.auth.AuthService;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.dto.ResponseMapDTO;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.sql.SQLIntegrityConstraintViolationException;

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

    @ExceptionHandler(value = MissingRequestCookieException.class)
    public ResponseEntity<ResponseDTO<Object>> handleMissingRequestCookieException(MissingRequestCookieException exception) {
        return finishExceptionHandling(HttpStatus.UNAUTHORIZED, "Missing required cookies.");
    }

    @ExceptionHandler(value = PhotoUploadException.class)
    public ResponseEntity<ResponseDTO<Object>> handlePhotoUploadException(PhotoUploadException exception) {
        return finishExceptionHandling(HttpStatus.INTERNAL_SERVER_ERROR, exception);
    }

    @ExceptionHandler(value = ExpiredJwtException.class)
    public ResponseEntity<ResponseDTO<Object>> handleExpiredJwtException(ExpiredJwtException exception) {
        return finishExceptionHandling(HttpStatus.UNAUTHORIZED, exception);
    }

    @ExceptionHandler(value = UsernameNotFoundException.class)
    public ResponseEntity<ResponseDTO<Object>> handleEUsernameNotFoundException(UsernameNotFoundException exception) {
        return finishExceptionHandling(HttpStatus.NOT_FOUND, exception);
    }

    @ExceptionHandler(value = FileNotFoundException.class)
    public ResponseEntity<ResponseDTO<Object>> handleFileNotFoundException(FileNotFoundException exception) {
        return finishExceptionHandling(HttpStatus.NOT_FOUND, exception.getMessage());
    }

    @ExceptionHandler(value = SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ResponseDTO<Object>> handleSQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException exception) {
        return finishExceptionHandling(HttpStatus.NOT_FOUND, exception.getMessage());
    }

    @ExceptionHandler(value = SignatureException.class)
    public ResponseEntity<ResponseMapDTO> handleSignatureException() {
        return authService.logout();
    }

    private ResponseEntity<ResponseDTO<Object>> finishExceptionHandling(HttpStatus status, RuntimeException exception) {
        return finishExceptionHandling(status, exception.getMessage());
    }

    private ResponseEntity<ResponseDTO<Object>> finishExceptionHandling(HttpStatus status, String message) {
        ResponseDTO<Object> responseDTO = new ResponseDTO<>(status.value(), message);
        return new ResponseEntity<>(responseDTO, status);
    }
}

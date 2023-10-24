package com.github.fireshot.auth;

import com.github.fireshot.dto.LoginRequestDTO;
import com.github.fireshot.dto.RegisterRequestDTO;
import com.github.fireshot.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * RestController that handles requests to the REST API
 * with a URL base of /api/auth
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO<String>> register(@RequestBody RegisterRequestDTO registerRequestDTO) {
        return authService.register(registerRequestDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO<String>> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        return authService.login(loginRequestDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDTO<Object>> logout() {
        return authService.logout();
    }

    @PostMapping("/token")
    public ResponseEntity<ResponseDTO<String>> token(@CookieValue(name = "refresh-token") String refreshToken) {
        return authService.token(refreshToken);
    }
}

package com.github.fireshot.auth;

import com.github.fireshot.dto.LoginRequestDTO;
import com.github.fireshot.dto.RegisterRequestDTO;
import com.github.fireshot.dto.ResponseMapDTO;
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
    public ResponseEntity<ResponseMapDTO> register(@RequestBody RegisterRequestDTO registerRequestDTO) {
        return authService.register(registerRequestDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseMapDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        return authService.login(loginRequestDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseMapDTO> logout() {
        return authService.logout();
    }

    @PostMapping("/refresh")
    public ResponseEntity<ResponseMapDTO> refresh(@CookieValue(name = "refresh-token") String refreshToken, @CookieValue(name = "logged-user") String username) {
        return authService.refresh(refreshToken, username);
    }
}

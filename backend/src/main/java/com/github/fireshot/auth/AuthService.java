package com.github.fireshot.auth;

import com.github.fireshot.dto.LoginRequestDTO;
import com.github.fireshot.dto.RegisterRequestDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.security.JwtService;
import com.github.fireshot.user.User;
import com.github.fireshot.user.UserRepository;
import com.github.fireshot.user.UserService;
import com.github.fireshot.utils.Utility;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final String DOMAIN;
    private final long JWT_EXPIRATION;
    private final long REFRESH_EXPIRATION;

    public AuthService(UserRepository repository, JwtService jwtService, AuthenticationManager authenticationManager, UserService userService, @Value("${environment.domain}") String DOMAIN, @Value("${environment.jwt.expiration}") long JWT_EXPIRATION, @Value("${environment.jwt.refresh-expiration}") long REFRESH_EXPIRATION) {
        this.repository = repository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.DOMAIN = DOMAIN;
        this.JWT_EXPIRATION = JWT_EXPIRATION;
        this.REFRESH_EXPIRATION = REFRESH_EXPIRATION;
    }

    @Transactional
    public ResponseEntity<ResponseDTO<String>> register(RegisterRequestDTO request) {
        userService.createUser(request);
        ResponseDTO<String> response = new ResponseDTO<>(HttpStatus.OK.value(), "Account created successfully.");

        return ResponseEntity.ok().body(response);
    }

    @Transactional
    public ResponseEntity<ResponseDTO<String>> login(LoginRequestDTO request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        User user = repository.findByEmail(request.email()).orElseThrow(() -> new BadCredentialsException("E-mail or password incorrect. Please try again."));

        String userEmail = user.getEmail();

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("loggedUser", userEmail);

        return finishAuthentication(jwtService.generateToken(user), jwtService.generateRefreshToken(user), userEmail, "Logged in.", responseMap);
    }

    @Transactional
    public ResponseEntity<ResponseDTO<String>> logout() {
        String deleteJwtCookie = destroyCookie("jwt-token");
        String deleteRefreshCookie = destroyCookie("refresh-token");
        String deleteLoggedUser = destroyCookie("logged-user");

        ResponseDTO<String> response = new ResponseDTO<>(HttpStatus.OK.value(), "Logged out.");

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteJwtCookie)
                .header(HttpHeaders.SET_COOKIE, deleteRefreshCookie)
                .header(HttpHeaders.SET_COOKIE, deleteLoggedUser)
                .body(response);
    }

    public ResponseEntity<ResponseDTO<String>> refresh(String refreshToken, String username) {
        UserDetails user = userService.loadUserByUsername(username);

        if (!jwtService.isTokenValid(refreshToken, user))
            throw new ValidationException("Refresh token not valid.");

        refreshToken = jwtService.regenerateRefreshToken(refreshToken, user);

        return finishAuthentication(jwtService.generateToken(user), refreshToken, username, "Session refreshed.");
    }

    private ResponseEntity<ResponseDTO<String>> finishAuthentication(String accessToken, String refreshToken, String username, String message, Map<String, String> responseMap) {
        String nickname = ((User) userService.loadUserByUsername(username)).getNickname();

        String jwtCookie = createCookie("jwt-token", accessToken, JWT_EXPIRATION, true);
        String loggedUser = createCookie("logged-user", username, Utility.convertDaysToMinutes(REFRESH_EXPIRATION), true);
        String loggedUserNickname = createCookie("nickname", nickname, Utility.convertDaysToMinutes(REFRESH_EXPIRATION), false);
        String refreshCookie = createCookie("refresh-token", refreshToken, Utility.convertDaysToMinutes(REFRESH_EXPIRATION), true);

        ResponseDTO<String> response = new ResponseDTO<>(HttpStatus.OK.value(), message, responseMap);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie)
                .header(HttpHeaders.SET_COOKIE, refreshCookie)
                .header(HttpHeaders.SET_COOKIE, loggedUser)
                .header(HttpHeaders.SET_COOKIE, loggedUserNickname)
                .body(response);
    }

    private ResponseEntity<ResponseDTO<String>> finishAuthentication(String accessToken, String refreshToken, String username, String message) {
        return finishAuthentication(accessToken, refreshToken, username, message, new HashMap<>());
    }

    private String createCookie(String name, String value, long expirationMinutes, boolean httpOnly) {
        return ResponseCookie.from(name, value)
                .httpOnly(httpOnly)
                .secure(true)
                .path("/")
                .maxAge(expirationMinutes * 60)
                .domain(DOMAIN)
                .sameSite("strict")
                .build().toString();
    }

    private String destroyCookie(String name) {
        return ResponseCookie.from(name, null)
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(0)
                .domain(DOMAIN)
                .sameSite("strict")
                .build().toString();
    }
}

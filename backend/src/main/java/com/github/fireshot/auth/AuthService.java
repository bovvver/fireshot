package com.github.fireshot.auth;

import com.github.fireshot.dto.LoginRequestDTO;
import com.github.fireshot.dto.RegisterRequestDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.dto.TokensDTO;
import com.github.fireshot.enums.Role;
import com.github.fireshot.security.TokenGenerator;
import com.github.fireshot.user.User;
import com.github.fireshot.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class AuthService {
    /**
     * UserService component containing whole business logic of {@code User.class}
     */
    @Autowired
    private UserService userService;
    /**
     * TokenGenerator component containing logic used to generate JWT access tokens
     * and refresh tokens
     */
    @Autowired
    private TokenGenerator tokenGenerator;
    /**
     * DaoAuthenticationProvider component used to authenticate users
     * based on information stored in the database.
     */
    @Autowired
    private DaoAuthenticationProvider daoAuthenticationProvider;
    /**
     * JwtAuthenticationProvider component used to authenticate users
     * based on information stored in the JWT token.
     * This component is able to read token details and JWT signature.
     */
    @Autowired
    @Qualifier("jwtRefreshTokenAuthProvider")
    private JwtAuthenticationProvider refreshTokenAuthProvider;

    public ResponseEntity<ResponseDTO<String>> register(RegisterRequestDTO registerRequestDTO) {
        User user = new User(registerRequestDTO.email(), registerRequestDTO.nickname(), registerRequestDTO.password(), Role.USER, false, false, true);
        userService.createUser(user);
        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, registerRequestDTO.password(), List.of());

        return completeAuthentication(authentication, HttpStatus.CREATED, "Account created.");
    }

    public ResponseEntity<ResponseDTO<String>> login(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginRequestDTO.email(), loginRequestDTO.password()));
        return completeAuthentication(authentication, "Logged in.");
    }

    public ResponseEntity<ResponseDTO<Object>> logout() {
        return tokenGenerator.destroyToken();
    }

    public ResponseEntity<ResponseDTO<String>> token(String refreshToken) {
        Authentication authentication = refreshTokenAuthProvider.authenticate(new BearerTokenAuthenticationToken(refreshToken));
        return completeAuthentication(authentication, "Session refreshed.");
    }

    private ResponseEntity<ResponseDTO<String>> completeAuthentication(Authentication authentication, HttpStatus status, String message) {
        TokensDTO tokens = tokenGenerator.getTokens(authentication);

        HashMap<String, String> accessTokenHashMap = new HashMap<>();
        accessTokenHashMap.put("nickname", authentication.getName());
        accessTokenHashMap.put("accessToken", tokens.accessToken());

        ResponseDTO<String> response = new ResponseDTO<>(status.value(), message, accessTokenHashMap);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, tokens.refreshTokenCookie())
                .header(HttpHeaders.SET_COOKIE, tokens.isRefreshTokenPresentCookie())
                .body(response);
    }

    private ResponseEntity<ResponseDTO<String>> completeAuthentication(Authentication authentication, String message) {
        return completeAuthentication(authentication, HttpStatus.OK, message);
    }
}

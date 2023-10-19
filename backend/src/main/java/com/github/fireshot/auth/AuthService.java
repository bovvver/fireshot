package com.github.fireshot.auth;

import com.github.fireshot.dto.LoginDTO;
import com.github.fireshot.dto.RegisterDTO;
import com.github.fireshot.dto.TokenDTO;
import com.github.fireshot.enums.Role;
import com.github.fireshot.security.TokenGenerator;
import com.github.fireshot.user.User;
import com.github.fireshot.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.stereotype.Service;

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

    /**
     * Handles API request sent to URL "/api/auth/register". Endpoint responsible
     * for registration of new  users.
     *
     * @param registerDTO DTO object containing required data to register successfully. {@code String email, String password}
     * @return {@code ResponseEntity.ok(generatedTokens)} if authentication is successful.
     */
    public ResponseEntity<TokenDTO> register(RegisterDTO registerDTO) {
        User user = new User(registerDTO.email(), registerDTO.nickname(), registerDTO.password(), Role.USER, false, false, true);
        userService.createUser(user);
        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, registerDTO.password(), List.of());

        return tokenGenerator.createToken(authentication);
    }

    /**
     * Handles API request sent to URL "/api/auth/login". Endpoint responsible
     * for user login.
     *
     * @param loginDTO DTO object containing required data to login successfully. {@code String email, String password}
     * @return {@code ResponseEntity.ok(generatedTokens)} if authentication is successful.
     */
    public ResponseEntity<TokenDTO> login(LoginDTO loginDTO) {
            Authentication authentication = daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginDTO.email(), loginDTO.password()));
            return tokenGenerator.createToken(authentication);
    }

    public ResponseEntity<Object> logout() {
        return tokenGenerator.destroyToken();
    }

    /**
     * Handles API request sent to URL "/api/auth/token". Endpoint responsible
     * for refreshing JWT token if required.
     *
     * @param refreshToken - token obtained from a cookie.
     * @return {@code ResponseEntity.ok(generatedTokens)} if authentication is successful.
     */
    public ResponseEntity<TokenDTO> token(String refreshToken) {
        Authentication authentication = refreshTokenAuthProvider.authenticate(new BearerTokenAuthenticationToken(refreshToken));
        Jwt jwt = (Jwt) authentication.getCredentials();

        return tokenGenerator.createToken(authentication);
    }
}

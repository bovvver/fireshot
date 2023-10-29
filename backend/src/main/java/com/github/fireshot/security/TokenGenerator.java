package com.github.fireshot.security;

import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.dto.TokensDTO;
import com.github.fireshot.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * TokenGenerator component containing logic used to generate JWT access tokens
 * and refresh tokens
 */
@Component
public class TokenGenerator {
    @Autowired
    JwtEncoder accessTokenEncoder;
    @Autowired
    @Qualifier("jwtRefreshTokenEncoder")
    JwtEncoder refreshTokenEncoder;
    private final int JWT_EXPIRATION;
    private final int REFRESH_EXPIRATION;
    private final String ISSUER;
    private final String AUDIENCE;
    private final String DOMAIN;

    /**
     * Creates new TokenGenerator object / defines required fields.
     *
     * @param accessTokenEncoder  - encodes access tokens.
     * @param refreshTokenEncoder - encodes refresh tokens.
     * @param JWT_EXPIRATION      - JWT access token expiration days.
     * @param REFRESH_EXPIRATION  - JWT refresh token expiration days.
     * @param ISSUER              - token issuer.
     * @param AUDIENCE            - token audience.
     */
    public TokenGenerator(JwtEncoder accessTokenEncoder, JwtEncoder refreshTokenEncoder, @Value("${environment.jwt.expiration}") int JWT_EXPIRATION, @Value("${environment.jwt.refresh-expiration}") int REFRESH_EXPIRATION, @Value("${environment.issuer}") String ISSUER, @Value("${environment.audience}") String AUDIENCE, @Value("${environment.domain}") String DOMAIN) {
        this.accessTokenEncoder = accessTokenEncoder;
        this.refreshTokenEncoder = refreshTokenEncoder;
        this.JWT_EXPIRATION = JWT_EXPIRATION;
        this.REFRESH_EXPIRATION = REFRESH_EXPIRATION;
        this.ISSUER = ISSUER;
        this.AUDIENCE = AUDIENCE;
        this.DOMAIN = DOMAIN;
    }

    private String createAccessToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .audience(List.of(AUDIENCE))
                .issuedAt(now)
                .expiresAt(now.plus(JWT_EXPIRATION, ChronoUnit.MINUTES))
                .subject(String.valueOf(user.getId()))
                .build();

        return accessTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    private String returnAccessToken(Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof User)) {
            throw new BadCredentialsException(
                    MessageFormat.format("principal {0} is not of User type", authentication.getPrincipal().getClass())
            );
        }
        return createAccessToken(authentication);
    }

    private String createRefreshToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .audience(List.of(AUDIENCE))
                .issuedAt(now)
                .expiresAt(now.plus(REFRESH_EXPIRATION, ChronoUnit.DAYS))
                .subject(String.valueOf(user.getId()))
                .build();

        return refreshTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    private String returnRefreshToken(Authentication authentication) {
        String refreshToken;

        if (authentication.getCredentials() instanceof Jwt jwt) {
            Duration duration = Duration.between(Instant.now(), jwt.getExpiresAt());
            long daysUntilExpired = duration.toDays();

            if (daysUntilExpired < 7) refreshToken = createRefreshToken(authentication);
            else refreshToken = jwt.getTokenValue();
        } else refreshToken = createRefreshToken(authentication);

        return createCookie("refresh-token", refreshToken, true).toString();
    }

    public TokensDTO getTokens(Authentication authentication) {
        String accessTokenHashMap = returnAccessToken(authentication);
        String refreshTokenCookie = returnRefreshToken(authentication);

        String isRefreshTokenPresentCookie = createCookie("refresh-present", "present", false).toString();

        return new TokensDTO(accessTokenHashMap, refreshTokenCookie, isRefreshTokenPresentCookie);
    }

    /**
     * Destroys refresh token stored in Cookies.
     * This method is overriding refresh token with values to cookie
     * with same name, but empty values which leads to its deletion.
     *
     * @return ResponseEntity with empty cookies.
     */

    public ResponseEntity<ResponseDTO<Object>> destroyToken() {
        ResponseCookie emptyRefreshTokenCookie = destroyCookie("refresh-token");
        ResponseCookie emptyIsRefreshTokenPresentCookie = destroyCookie("refresh-present");

        ResponseDTO<Object> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "Logged out.");

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, emptyRefreshTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, emptyIsRefreshTokenPresentCookie.toString())
                .body(responseDTO);
    }

    /**
     * Creates token cookie.
     *
     * @param name  - cookie's name.
     * @param value - cookie's value (token).
     * @return ResponseCookie with name and value from parameters with secure settings.
     */
    private ResponseCookie createCookie(String name, String value, boolean secured) {
        return ResponseCookie.from(name, value)
                .httpOnly(secured)
                .secure(secured)
                .path("/")
                .maxAge((long) REFRESH_EXPIRATION * 24 * 60 * 60)
                .domain(DOMAIN)
                .sameSite("strict")
                .build();
    }

    /**
     * Destroys requested Cookie.
     *
     * @param name - name of cookie to delete.
     * @return ResponseCookie with empty values which leads to deletion of the cookie.
     */
    private ResponseCookie destroyCookie(String name) {
        return ResponseCookie.from(name, null)
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(0)
                .domain(DOMAIN)
                .sameSite("strict")
                .build();
    }
}
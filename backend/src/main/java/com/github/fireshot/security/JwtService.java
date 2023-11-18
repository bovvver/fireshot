package com.github.fireshot.security;

import com.github.fireshot.utils.Utility;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private final String SECRET_KEY;
    private final long JWT_EXPIRATION;
    private final long REFRESH_EXPIRATION;
    private final String ISSUER;
    private final String AUDIENCE;
    private UserDetailsService userDetailsService;

    public JwtService(@Value("${environment.secret.key}") String SECRET_KEY, @Value("${environment.jwt.expiration}") long JWT_EXPIRATION, @Value("${environment.issuer}") String ISSUER, @Value("${environment.audience}") String AUDIENCE, @Value("${environment.jwt.refresh-expiration}") long REFRESH_EXPIRATION, UserDetailsService userDetailsService) {
        this.SECRET_KEY = SECRET_KEY;
        this.JWT_EXPIRATION = JWT_EXPIRATION;
        this.REFRESH_EXPIRATION = REFRESH_EXPIRATION;
        this.ISSUER = ISSUER;
        this.AUDIENCE = AUDIENCE;
        this.userDetailsService = userDetailsService;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails, JWT_EXPIRATION);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails, Utility.convertDaysToMinutes(REFRESH_EXPIRATION));
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, long expirationInMinutes) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + Utility.convertMinutesToMilliseconds(expirationInMinutes));

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setAudience(AUDIENCE)
                .setIssuer(ISSUER)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public boolean isTokenValid(String token, String username) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return isTokenValid(token, userDetails);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String regenerateRefreshToken(String refreshToken, UserDetails user) {
        long daysUntilExpire = ChronoUnit.DAYS.between(Instant.now(), extractExpiration(refreshToken).toInstant());

        if (daysUntilExpire < 7) return generateRefreshToken(user);
        return refreshToken;
    }
}

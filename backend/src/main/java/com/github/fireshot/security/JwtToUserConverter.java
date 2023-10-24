package com.github.fireshot.security;

import com.github.fireshot.user.User;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Class used to convert {@code User} object to JWT token.
 */
@Component
public class JwtToUserConverter implements Converter<Jwt, UsernamePasswordAuthenticationToken> {
    @Override
    public UsernamePasswordAuthenticationToken convert(@NonNull Jwt jwt) {
        User user = new User();
        return new UsernamePasswordAuthenticationToken(user, jwt, List.of());
    }
}

package com.github.fireshot.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
    private final boolean ALLOW_CREDENTIALS;
    private final String ALLOWED_ORIGINS;
    private final long MAX_AGE;

    public CorsConfiguration(@Value("${environment.allow.credentials}") boolean ALLOW_CREDENTIALS, @Value("${environment.allow.origins}") String ALLOWED_ORIGINS, @Value("${environment.max.age}") long MAX_AGE) {
        this.ALLOW_CREDENTIALS = ALLOW_CREDENTIALS;
        this.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
        this.MAX_AGE = MAX_AGE;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(ALLOW_CREDENTIALS)
                .allowedOrigins(ALLOWED_ORIGINS)
                .allowedMethods("GET", "POST")
                .allowedHeaders("Host", "Content-Type", "Content-Length")
                .maxAge(MAX_AGE);
    }
}

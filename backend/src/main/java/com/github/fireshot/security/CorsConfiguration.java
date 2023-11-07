package com.github.fireshot.security;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Main CORS filter.
 * Defines which requests are passed to application.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@WebFilter("/*")
public class CorsConfiguration implements Filter {
    private final String ALLOW_CREDENTIALS;
    private final String ALLOWED_ORIGINS;
    private final String MAX_AGE;

    /**
     * Creates fields required for CORS filter to work.
     *
     * @param ALLOW_CREDENTIALS - Are credentials allowed in app.
     * @param ALLOWED_ORIGINS   - Origins that have access to app.
     * @param MAX_AGE           - Define how long the browser should remember to allow CORS requests.
     */
    public CorsConfiguration(@Value("${environment.allow.credentials}") String ALLOW_CREDENTIALS, @Value("${environment.allow.origins}") String ALLOWED_ORIGINS, @Value("${environment.max.age}") String MAX_AGE) {
        this.ALLOW_CREDENTIALS = ALLOW_CREDENTIALS;
        this.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
        this.MAX_AGE = MAX_AGE;
    }

    /**
     * Checks if request is authorized to access this app. It is checked
     * whether the request meets the requirements set in the filter headers.
     *
     * @param req   - request to application.
     * @param resp  - response sent to the next filter.
     * @param chain - filter chain containing every filter, that request must go through to access the application.
     * @throws IOException      - If an I/O error occurs during the filter execution.
     *                          For example, if there is an issue with reading from or writing to the request or response streams.
     * @throws ServletException - If a servlet-specific error occurs during the filter execution.
     *                          This exception is typically used when there is a problem with servlet processing.
     */
    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) resp;
        HttpServletRequest request = (HttpServletRequest) req;
        response.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
        response.setHeader("Access-Control-Allow-Credentials", ALLOW_CREDENTIALS);
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Max-Age", MAX_AGE);
        response
                .setHeader("Access-Control-Allow-Headers", "Origin, origin, x-requested-with, authorization, " +
                        "Content-Type, Authorization, credential, X-XSRF-TOKEN");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, resp);
        }
    }
}
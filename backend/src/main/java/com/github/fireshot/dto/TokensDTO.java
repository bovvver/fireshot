package com.github.fireshot.dto;

public record TokensDTO(String accessToken, String refreshTokenCookie,
                        String isRefreshTokenPresentCookie) {
}
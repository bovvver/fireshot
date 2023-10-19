package com.github.fireshot.dto;

import com.github.fireshot.user.User;
import lombok.Builder;

@Builder
public record UserDTO(int id, String email) {
    public static UserDTO from(User user) {
        return builder()
                .id(user.getId())
                .email(user.getUsername())
                .build();
    }
}
package com.github.fireshot.dto;

import org.springframework.web.multipart.MultipartFile;

public record ProfileUpdateDTO(MultipartFile file, String description, String nickname) {
}

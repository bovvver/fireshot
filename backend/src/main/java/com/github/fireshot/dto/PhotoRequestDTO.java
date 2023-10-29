package com.github.fireshot.dto;

import org.springframework.web.multipart.MultipartFile;

public record PhotoRequestDTO(MultipartFile file, String description, String location) {
}

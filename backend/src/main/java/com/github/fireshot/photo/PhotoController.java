package com.github.fireshot.photo;

import com.github.fireshot.dto.PhotoRequestDTO;
import com.github.fireshot.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PhotoController {
    private PhotoService photoService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDTO<Object>> uploadPhoto(PhotoRequestDTO photoRequest) {
        return photoService.uploadPhoto(photoRequest);
    }
}

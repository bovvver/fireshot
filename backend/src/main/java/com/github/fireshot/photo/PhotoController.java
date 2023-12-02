package com.github.fireshot.photo;

import com.github.fireshot.dto.PhotoRequestDTO;
import com.github.fireshot.dto.ProfileUpdateDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.dto.ResponsePageDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/photo")
public class PhotoController {
    private PhotoService photoService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDTO<Object>> uploadPhoto(@CookieValue(name = "logged-user") String username, PhotoRequestDTO photoRequest) {
        return photoService.addPhoto(username, photoRequest);
    }

    @GetMapping(value = "/{username}/{photo}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getPhoto(@PathVariable String username, @PathVariable String photo) throws IOException {
        return photoService.getPhoto(username, photo);
    }

    @PostMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDTO<Object>> updateProfile(@CookieValue(name = "logged-user") String username, ProfileUpdateDTO profileUpdate) {
        return photoService.updateProfile(username, profileUpdate);
    }

    @GetMapping(value = "/avatar/{username}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getAvatar(@PathVariable String username) throws IOException {
        return photoService.getPhoto(username);
    }

    @GetMapping(value = "/home/page/{page}")
    public ResponseEntity<ResponsePageDTO<Photo>> getPageOfPosts(@PathVariable int page, @CookieValue(name="logged-user") String username) {
        return photoService.getPageOfPosts(page, username);
    }
}

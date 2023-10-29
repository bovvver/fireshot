package com.github.fireshot.photo;

import com.github.fireshot.dto.PhotoRequestDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.exceptions.PhotoUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PhotoService {
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";

    public ResponseEntity<ResponseDTO<Object>> uploadPhoto(PhotoRequestDTO photoRequest) {
        MultipartFile photoFile = photoRequest.file();

        if(photoFile == null) throw new PhotoUploadException("Correct photo is not provided.");

        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, photoFile.getOriginalFilename());
        try {
            Files.write(fileNameAndPath, photoFile.getBytes());
        } catch (IOException e) {
            throw new PhotoUploadException("Error when uploading a photo.");
        }

        System.out.println(UPLOAD_DIRECTORY);

        ResponseDTO<Object> response = new ResponseDTO<>(HttpStatus.OK.value(), "Photo added.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

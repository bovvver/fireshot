package com.github.fireshot.photo;

import com.github.fireshot.dto.PhotoRequestDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.exceptions.PhotoUploadException;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Date;

@Service
public class PhotoService {
    private final String UPLOAD_PATH;
    private final String AVATAR_PATH;
    private final String AVATAR_NAME;

    public PhotoService(@Value("${environment.upload.path}") String UPLOAD_PATH, @Value("${environment.avatar.path}") String AVATAR_PATH, @Value("${environment.avatar.name}") String AVATAR_NAME) {
        this.UPLOAD_PATH = UPLOAD_PATH;
        this.AVATAR_PATH = AVATAR_PATH;
        this.AVATAR_NAME = AVATAR_NAME;
    }

    public ResponseEntity<ResponseDTO<Object>> uploadPhoto(String username, PhotoRequestDTO photoRequest, String path) {
        MultipartFile photoFile = photoRequest.file();
        if (photoFile == null || photoFile.getOriginalFilename() == null)
            throw new PhotoUploadException("Correct photo is not provided.");

        saveImage(photoFile, username, path);

        ResponseDTO<Object> response = new ResponseDTO<>(HttpStatus.OK.value(), "Photo added.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseDTO<Object>> addPhoto(String username, PhotoRequestDTO photoRequest) {
        return uploadPhoto(username, photoRequest, UPLOAD_PATH);
    }

    public ResponseEntity<ResponseDTO<Object>> addAvatar(String username, PhotoRequestDTO photoRequest) {
        return uploadPhoto(username, photoRequest, AVATAR_PATH);
    }

    private void saveImage(MultipartFile image, String username, String path) {
        try {
            BufferedImage bufferedPhotoFile = resizeImage(ImageIO.read(image.getInputStream()));
            File imageFolder = createImageFolder(path, username);
            String[] fileParts = validateFileFormat(image.getOriginalFilename());

            if (path.equals(AVATAR_PATH)) addAvatarPhoto(imageFolder, bufferedPhotoFile, fileParts);
            else addGalleryPhoto(imageFolder, bufferedPhotoFile, fileParts);

        } catch (IOException e) {
            throw new PhotoUploadException("Error while uploading the file. Please try again.");
        }
    }

    private File createImageFolder(String path, String username) {
        File imageFolder = new File(System.getProperty("user.dir") + path + "/" + username);
        if (!imageFolder.exists()) imageFolder.mkdirs();
        return imageFolder;
    }

    private String[] validateFileFormat(String originalFilename) {
        String[] fileParts = originalFilename.split("\\.");
        if (fileParts.length != 2) {
            throw new PhotoUploadException("Photo must have exactly one file format.");
        }
        if (!fileParts[1].equals("jpg") && !fileParts[1].equals("png")) {
            throw new PhotoUploadException("You can pass only .jpg and .png files.");
        }
        return fileParts;
    }

    private File createOutputFile(File imageFolder, String[] fileParts) {
        return new File(imageFolder, fileParts[0] + "-" + new Date().getTime() + "." + fileParts[1]);
    }

    private void writeImageToFile(BufferedImage bufferedPhotoFile, String format, File outputFile) throws IOException {
        ImageIO.write(bufferedPhotoFile, format, outputFile);
    }

    private BufferedImage resizeImage(BufferedImage originalImage) {
        return Scalr.resize(originalImage, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_HEIGHT, 600, Scalr.OP_ANTIALIAS);
    }

    private void addGalleryPhoto(File imageFolder, BufferedImage bufferedPhotoFile, String[] fileParts) throws IOException {
        File outputFile = createOutputFile(imageFolder, fileParts);
        writeImageToFile(bufferedPhotoFile, fileParts[1], outputFile);
    }

    private void addAvatarPhoto(File imageFolder, BufferedImage bufferedPhotoFile, String[] fileParts) throws IOException {
        if (!fileParts[1].equals("png"))
            writeImageToFile(bufferedPhotoFile, "jpg", new File(imageFolder, AVATAR_NAME));
        else {
            BufferedImage newImage = new BufferedImage(bufferedPhotoFile.getWidth(), bufferedPhotoFile.getHeight(), BufferedImage.TYPE_INT_RGB);
            newImage.createGraphics().drawImage(bufferedPhotoFile, 0, 0, Color.BLACK, null);
            writeImageToFile(newImage, "jpg", new File(imageFolder, AVATAR_NAME));
        }
    }
}

package com.github.fireshot.photo;

import com.github.fireshot.dto.PhotoRequestDTO;
import com.github.fireshot.dto.ProfileUpdateDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.dto.ResponsePageDTO;
import com.github.fireshot.exceptions.PhotoNotFoundException;
import com.github.fireshot.exceptions.PhotoUploadException;
import com.github.fireshot.exceptions.UserAlreadyExistsException;
import com.github.fireshot.user.User;
import com.github.fireshot.user.UserService;
import org.apache.commons.io.IOUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.Date;

@Service
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final UserService userService;
    private final String UPLOAD_PATH;
    private final String AVATAR_PATH;
    private final String AVATAR_NAME;

    public PhotoService(UserService userService, PhotoRepository photoRepository, @Value("${environment.upload.path}") String UPLOAD_PATH, @Value("${environment.avatar.path}") String AVATAR_PATH, @Value("${environment.avatar.name}") String AVATAR_NAME) {
        this.userService = userService;
        this.photoRepository = photoRepository;
        this.UPLOAD_PATH = UPLOAD_PATH;
        this.AVATAR_PATH = AVATAR_PATH;
        this.AVATAR_NAME = AVATAR_NAME;
    }

    public Photo findById(int id) {
        return photoRepository.findById(id).orElseThrow(() -> new PhotoNotFoundException("Photo not found."));
    }

    public void uploadPhoto(String username, PhotoRequestDTO photoRequest, String path) {
        MultipartFile photoFile = photoRequest.file();
        if (photoFile == null || photoFile.getOriginalFilename() == null)
            throw new PhotoUploadException("Correct photo is not provided.");

        saveImage(photoRequest, username, path);
    }

    public void uploadPhoto(String username, ProfileUpdateDTO profileUpdate, String path) {
        PhotoRequestDTO photoRequest = new PhotoRequestDTO(profileUpdate.file(), "", "");
        uploadPhoto(username, photoRequest, path);
    }

    public ResponseEntity<ResponseDTO<Object>> addPhoto(String username, PhotoRequestDTO photoRequest) {
        uploadPhoto(username, photoRequest, UPLOAD_PATH);
        ResponseDTO<Object> response = new ResponseDTO<>(HttpStatus.OK.value(), "Photo added.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<ResponseDTO<Object>> updateProfile(String username, ProfileUpdateDTO profileUpdate) {
        User user = (User) userService.loadUserByUsername(username);

        String description = profileUpdate.description();
        String nickname = profileUpdate.nickname();

        if (profileUpdate.file() != null)
            uploadPhoto(username, profileUpdate, AVATAR_PATH);
        if (!description.equals(""))
            user.setDescription(description);
        if (!nickname.equals("")) {
            if (userService.checkNicknameAvailability(nickname) != null)
                throw new UserAlreadyExistsException("This username is already taken.");
            user.setNickname(nickname);
        }

        userService.saveUser(user);

        ResponseDTO<Object> response = new ResponseDTO<>(HttpStatus.OK.value(), "Profile updated.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void saveImage(PhotoRequestDTO request, String username, String path) {
        MultipartFile image = request.file();
        String filename = image.getOriginalFilename();
        try {
            BufferedImage bufferedPhotoFile = resizeImage(ImageIO.read(image.getInputStream()));
            File imageFolder = createImageFolder(path, username);
            String[] fileParts = validateFileFormat(filename);

            if (path.equals(AVATAR_PATH)) addAvatarPhoto(imageFolder, bufferedPhotoFile, fileParts);
            else addGalleryPhoto(request, username, imageFolder, bufferedPhotoFile, fileParts);

        } catch (IOException e) {
            throw new PhotoUploadException("Error while uploading the file. Please try again.");
        }
    }

    private File createImageFolder(String path, String username) {
        File imageFolder = new File(System.getProperty("user.dir") + "/" + path + "/" + username);
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

    private void addGalleryPhoto(PhotoRequestDTO request, String username, File imageFolder, BufferedImage bufferedPhotoFile, String[] fileParts) throws IOException {
        File outputFile = createOutputFile(imageFolder, fileParts);
        saveToDatabase(request, username, outputFile);
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

    private void saveToDatabase(PhotoRequestDTO request, String username, File imageFile) throws IOException {
        User user = (User) userService.loadUserByUsername(username);
        Path canonicalUserDir = new File(System.getProperty("user.dir") + "/" + UPLOAD_PATH).getCanonicalFile().toPath();
        String relativePath = canonicalUserDir.relativize(imageFile.toPath()).toString().replace("\\", "/");

        Photo photo = new Photo(relativePath, request.description(), request.location(), user);
        photoRepository.save(photo);
    }

    public byte[] getPhoto(String username, String photo, String basePath) throws IOException {
        User user = userService.findByEmailNullVariant(username);
        if (user == null) user = userService.findByNickname(username);

        String path = String.format("%s/%s/%s", basePath, user.getUsername(), photo);
        File file = new File(path);
        InputStream in = new FileInputStream(file);

        return IOUtils.toByteArray(in);
    }

    public byte[] getPhoto(String username, String photo) throws IOException {
        return getPhoto(username, photo, UPLOAD_PATH);
    }

    public byte[] getPhoto(String username) throws IOException {
        return getPhoto(username, AVATAR_NAME, AVATAR_PATH);
    }

    public ResponseEntity<ResponsePageDTO<Photo>> getPageOfPosts(int page, String username) {
        Pageable requestedPage = PageRequest.of(page - 1, 5);
        User user = userService.findByEmail(username);

        Page<Photo> resultPage = photoRepository.getPhotosForFollowedUsers(user.getId(), requestedPage).map(el -> {
            if (el.getLikesSet().contains(user)) el.setLiked(true);
            return el;
        });

        ResponsePageDTO<Photo> response = new ResponsePageDTO<>(200, "Page fetched", resultPage);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ResponseDTO<Object>> togglePhotoLike(int photoId, String username, boolean isLiking) {
        Photo targetPhoto = findById(photoId);
        User user = userService.findByEmail(username);
        boolean photoContainsUser = targetPhoto.getLikesSet().contains(user);

        if (isLiking) {
            if (!photoContainsUser)
                throw new UserAlreadyExistsException(username + " isn't liking this photo.");

            removeLike(targetPhoto, user);
        } else {
            if (photoContainsUser)
                throw new UserAlreadyExistsException(username + " is already liking this photo.");

            addLike(targetPhoto, user);
        }

        userService.saveUser(user);
        photoRepository.save(targetPhoto);

        return ResponseEntity.ok(new ResponseDTO<>(200, isLiking ? "Photo disliked." : "Photo liked."));
    }

    public void addLike(Photo photo, User user) {
        photo.getLikesSet().add(user);
        user.getLikedPhotos().add(photo);
    }

    public void removeLike(Photo photo, User user) {
        photo.getLikesSet().remove(user);
        user.getLikedPhotos().remove(photo);
    }
}
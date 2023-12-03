package com.github.fireshot.comment;

import com.github.fireshot.dto.CommentDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.photo.Photo;
import com.github.fireshot.photo.PhotoService;
import com.github.fireshot.user.User;
import com.github.fireshot.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommentService {
    private UserService userService;
    private PhotoService photoService;
    private CommentRepository commentRepository;

    public ResponseEntity<ResponseDTO<Object>> addComment(String username, CommentDTO commentDTO) {
        User author = userService.findByEmail(username);
        Photo photo = photoService.findById(commentDTO.photoId());
        Comment addedComment = new Comment(author, photo, commentDTO.content());
        commentRepository.save(addedComment);

        ResponseDTO<Object> response = new ResponseDTO<>(200, "Comment added.");
        return ResponseEntity.ok(response);
    }
}

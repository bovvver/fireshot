package com.github.fireshot.comment;

import com.github.fireshot.dto.CommentDTO;
import com.github.fireshot.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/comment")
public class CommentController {
    private CommentService commentService;

    @PostMapping(value = "/add")
    public ResponseEntity<ResponseDTO<Object>> addComment(@CookieValue(name = "logged-user") String username, @RequestBody CommentDTO commentDTO) {
        return commentService.addComment(username, commentDTO);
    }
}

package com.github.fireshot.user;

import com.github.fireshot.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @GetMapping(value = "/profile/{nickname}")
    public ResponseEntity<ResponseDTO<User>> getProfile(@CookieValue(name="logged-user") String loggedUser, @PathVariable String nickname) {
        return userService.getProfile(loggedUser, nickname);
    }

    @PostMapping(value = "/follow/{targetUserNickname}")
    public ResponseEntity<ResponseDTO<Object>> followProfile(@CookieValue(name = "logged-user") String sourceUserEmail, @PathVariable String targetUserNickname) {
        return userService.changeFollowProfile(sourceUserEmail, targetUserNickname, false);
    }

    @PostMapping(value = "/unfollow/{targetUserNickname}")
    public ResponseEntity<ResponseDTO<Object>> unfollowProfile(@CookieValue(name = "logged-user") String sourceUserEmail, @PathVariable String targetUserNickname) {
        return userService.changeFollowProfile(sourceUserEmail, targetUserNickname, true);
    }
}

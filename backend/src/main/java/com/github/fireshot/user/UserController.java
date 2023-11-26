package com.github.fireshot.user;

import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.dto.ResponseSetDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @GetMapping(value = "/profile/{nickname}")
    public ResponseEntity<ResponseDTO<User>> getProfile(@CookieValue(name = "logged-user") String loggedUser, @PathVariable String nickname) {
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

    @GetMapping(value = "/followers/{targetUserNickname}")
    public ResponseEntity<ResponseSetDTO<User>> getProfileFollowers(@PathVariable String targetUserNickname) {
        return userService.getProfileFollowers(targetUserNickname);
    }

    @GetMapping(value = "/following/{targetUserNickname}")
    public ResponseEntity<ResponseSetDTO<User>> getProfileFollowing(@PathVariable String targetUserNickname) {
        return userService.getProfileFollowing(targetUserNickname);
    }

    @GetMapping(value = "/search/{searchInput}")
    public ResponseEntity<ResponseSetDTO<String>> searchFromAllUsers(@PathVariable String searchInput) {
        return userService.searchFromAllUsers(searchInput);
    }

    @GetMapping(value = "/search/{targetUserNickname}/followers/{searchInput}")
    public ResponseEntity<ResponseSetDTO<String>> searchFromUserFollowers(@PathVariable String targetUserNickname, @PathVariable String searchInput) {
        return userService.searchFromUserFollowers(targetUserNickname, searchInput, true);
    }

    @GetMapping(value = "/search/{targetUserNickname}/following/{searchInput}")
    public ResponseEntity<ResponseSetDTO<String>> searchFromUserFollowing(@PathVariable String targetUserNickname, @PathVariable String searchInput) {
        return userService.searchFromUserFollowers(targetUserNickname, searchInput, false);
    }
}

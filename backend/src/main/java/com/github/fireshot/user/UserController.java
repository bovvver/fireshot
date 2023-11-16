package com.github.fireshot.user;

import com.github.fireshot.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @GetMapping(value = "/profile/{nickname}")
    public ResponseEntity<ResponseDTO<User>> getProfile(@PathVariable String nickname){
        return userService.getProfile(nickname);
    }
}

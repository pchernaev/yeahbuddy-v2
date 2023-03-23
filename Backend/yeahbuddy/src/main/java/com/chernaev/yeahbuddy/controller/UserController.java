package com.chernaev.yeahbuddy.controller;

import com.chernaev.yeahbuddy.model.entity.DTO.UserInfoDTO;
import com.chernaev.yeahbuddy.model.entity.User;
import com.chernaev.yeahbuddy.model.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/email={email}")
    @CrossOrigin
    public ResponseEntity<UserInfoDTO> getUserInfo(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserInfo(email));
    };
}

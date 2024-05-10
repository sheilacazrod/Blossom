package com.blossom.blossom_api.controllers;

import com.blossom.blossom_api.core.persistance.UserService;
import com.blossom.blossom_api.model.dto.UserDTO;
import com.blossom.blossom_api.model.entity.User;
import com.blossom.blossom_api.model.mappers.UserMapper;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

///TODO ip server
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    public UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public User createCRUD(@RequestBody UserDTO user) {
        User userEntity = UserMapper.toUser(user);
        return userService.createUser(userEntity);
    }

    @GetMapping("/getUserById")
    public User getUserById(@RequestParam String id) throws Exception {
        return userService.getUserById(id);
    }
    @GetMapping("/getUserByUsername")
    public User getUserByUsername(@RequestParam String username) throws Exception {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        return userService.getAllUsers();
    }

    @GetMapping("/getFollowed")
    public List<User> getFollowed(@RequestParam String userId) throws ExecutionException, InterruptedException {
        return userService.getFollowed(userId);
    }

    @GetMapping("/addFollowed")
    public List<User> addFollowed(@RequestParam String userId, @RequestParam String followedId) throws ExecutionException, InterruptedException {
        System.out.println("userId= " + userId + "\nfollowedId= " + followedId);
        return  userService.addFollowed(userId, followedId);
    }

    @GetMapping("/deleteFollowed")
    public List<User> deleteFollowed(@RequestParam String userId, @RequestParam String followedId) throws ExecutionException, InterruptedException {
       return userService.deleteFollowed(userId, followedId);
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody UserDTO user) throws Exception {
        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String id) {
        return userService.deleteUser(id);
    }

    @PostMapping("/startstreaming")
    public String startStreaming(@RequestParam("authToken") String authToken) {
        try {
            return userService.startStreaming(authToken);
        } catch (FirebaseAuthException e) {
            return "Error al iniciar streaming: " + e.getMessage();
        }
    }
}

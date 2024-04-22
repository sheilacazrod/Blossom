package com.blossom.blossom_api;


import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/app")
public class AppController {

    private final FirebaseService firestoreService;
    private final FirebaseAuthService firebaseAuthService;

    public AppController(FirebaseService firestoreService, FirebaseAuthService firebaseAuthService) {
        this.firestoreService = firestoreService;
        this.firebaseAuthService = firebaseAuthService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            // Crear la cuenta de usuario
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(registerRequest.getEmail())
                    .setPassword(registerRequest.getPassword())
                    .setDisplayName(registerRequest.getDisplayName())
                    .setDisabled(false);

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

            User user = new User();
            user.setUid(userRecord.getUid());
            user.setUsername(registerRequest.getDisplayName());

            firestoreService.saveUserToFirestore(user);

            return ResponseEntity.ok("Usuario registrado con correo electrónico: " + userRecord.getEmail());
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar usuario: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public String login(@RequestParam("email") String email, @RequestParam("password") String password) {
        return firebaseAuthService.signInWithPassword(email, password);
    }
}
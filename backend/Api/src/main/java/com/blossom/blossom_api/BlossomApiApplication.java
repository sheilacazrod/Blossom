package com.blossom.blossom_api;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;
@EnableWebMvc
@SpringBootApplication
public class BlossomApiApplication {

    public static void main(String[] args) throws IOException {

        ClassLoader classLoader = BlossomApiApplication.class.getClassLoader();

        File file = new File(Objects.requireNonNull(classLoader.getResource("firebase.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);

        SpringApplication.run(BlossomApiApplication.class, args);
    }
}

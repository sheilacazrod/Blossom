package com.blossom.blossom_api;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;
import java.io.InputStream;

@SpringBootApplication
public class BlossomApiApplication {

    public static void main(String[] args) throws IOException {

        ClassLoader classLoader = BlossomApiApplication.class.getClassLoader();

        //File file = new File(Objects.requireNonNull(classLoader.getResource("firebase.json")).getFile());
        //FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());
	
	InputStream inputStream = classLoader.getResourceAsStream("firebase.json");
        if (inputStream == null) {
            throw new IllegalStateException("El archivo firebase.json no se encontró en el classpath");
        }

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(inputStream))
                .build();

        FirebaseApp.initializeApp(options);

        SpringApplication.run(BlossomApiApplication.class, args);
    }

}

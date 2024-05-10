package com.blossom.blossom_api.model.entity;

import lombok.Data;
import java.util.List;

@Data
public class User {
    private String userId;
    private String username;
    private String streamUrl;
    private String streamPassword;
    private String pictureURL;
    private String biography;
    private List<String> followed;

    public String generateStreamUrl(int port) {
        return "rtmp://167.71.61.5:" + port;
    }

    public String generateStreamPassword() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();
        java.util.Random random = new java.util.Random();
        for (int i = 0; i < 8; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }
}

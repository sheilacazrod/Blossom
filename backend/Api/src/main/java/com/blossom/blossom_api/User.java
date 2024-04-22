package com.blossom.blossom_api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String Uid;
    private String username;
    private String streamUrl;
    private String streamPassword;

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

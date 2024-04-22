package com.blossom.blossom_api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String Uid;
    private String name;
    private String streamKey;
    private String email;

    public User(String email, String uid) {
        this.email = email;
        this.Uid = uid;
    }
}

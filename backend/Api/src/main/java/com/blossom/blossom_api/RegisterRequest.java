package com.blossom.blossom_api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String password;
    private String displayName;

    public RegisterRequest() {
    }
}

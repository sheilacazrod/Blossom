package com.blossom.blossom_api.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private String displayName;
    private String userId;
    private String pictureURL;
    private String biography;
    private List<String> followed;
}

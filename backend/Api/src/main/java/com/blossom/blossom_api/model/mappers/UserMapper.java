package com.blossom.blossom_api.model.mappers;

import com.blossom.blossom_api.PortManager;
import com.blossom.blossom_api.model.dto.UserDTO;
import com.blossom.blossom_api.model.entity.User;

public class UserMapper {
    public static User toUser(final UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getDisplayName());
        user.setUserId(userDTO.getUserId());
        user.setPictureURL(userDTO.getPictureURL());
        user.setStreamUrl(user.generateStreamUrl(PortManager.generateRandomPort()));
        user.setStreamPassword(user.generateStreamPassword());
        user.setBiography(userDTO.getBiography());
        user.setFollowed(userDTO.getFollowed());
        return user;
    }
}

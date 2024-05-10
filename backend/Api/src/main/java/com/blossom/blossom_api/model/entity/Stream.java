package com.blossom.blossom_api.model.entity;

import lombok.Data;

@Data
public class Stream {
    private String streamerId;
    private String title;
    private String[] categories;

    public Stream(String streamerId, String title, String[] categories) {
        this.streamerId = streamerId;
        this.title = title;
        this.categories = categories;
    }
}

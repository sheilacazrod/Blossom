package com.blossom.blossom_api.model.entity;

import lombok.Data;

import java.util.List;

@Data
public class Stream {
    private String streamerId;
    private String title;
    private List<String> categories;

    public Stream() {}

    public Stream(String streamerId, String title, List<String> categories) {
        this.streamerId = streamerId;
        this.title = title;
        this.categories = categories;
    }

}

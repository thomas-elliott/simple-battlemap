package com.github.thomaselliott.simplebattlemap.model;

import org.springframework.util.StringUtils;

public enum ImageFileType {
    PNG,
    JPG,
    GIF;

    public static ImageFileType fromString(String extension) {
        if (StringUtils.isEmpty(extension)) throw new IllegalArgumentException();
        switch (extension.toLowerCase()) {
            case "png":
                return PNG;
            case "jpg":
            case "jpeg":
                return JPG;
            case "gif":
                return GIF;
            default:
                throw new IllegalArgumentException();
        }
    }
}

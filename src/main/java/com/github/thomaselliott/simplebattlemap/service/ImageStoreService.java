package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.ImageFileType;

public interface ImageStoreService {
    String saveImage(byte[] image, ImageFileType fileType);
    byte[] getImage(Long imageId);
}

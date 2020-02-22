package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.service.AssetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController implements ImageApi {
    private AssetService assetService;

    @Autowired
    public ImageController(AssetService assetService) {
        this.assetService = assetService;
    }

    @Override
    public ResponseEntity<byte[]> getImage(String id) {
        byte[] image = assetService.getImage(id);

        if (image != null && image.length > 0) {
            return ResponseEntity.ok(image);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

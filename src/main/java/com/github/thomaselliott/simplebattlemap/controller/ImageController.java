package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.service.AssetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/image")
public class ImageController {
    private AssetService assetService;

    @Autowired
    public ImageController(AssetService assetService) {
        this.assetService = assetService;
    }

    @RequestMapping(value = "/{id}/image.png", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getImage(@PathVariable Long id) {
        return this.assetService.getImage(id);
    }

    @RequestMapping(value = "/{id}/thumbnail.png", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getThumbnail(@PathVariable Long id) {
        return this.assetService.getThumbnail(id);
    }
}

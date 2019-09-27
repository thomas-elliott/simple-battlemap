package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.AssetType;
import com.github.thomaselliott.simplebattlemap.model.ImageFile;
import com.github.thomaselliott.simplebattlemap.service.AssetService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/asset")
public class AssetController {
    private AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @RequestMapping(value = "/{type}")
    public Page<Asset> getAssetList(@PathVariable String type, Pageable pageable) {
        AssetType assetType = AssetType.fromString(type);

        return this.assetService.getAllByType(assetType, pageable);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteAsset(@PathVariable Long id) {
        this.assetService.deleteAsset(id);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity postAsset(@RequestParam String name,
                                    @RequestParam String type,
                                    @RequestParam MultipartFile imageFile,
                                    @RequestParam MultipartFile thumbnailFile) {
        AssetType assetType = AssetType.fromString(type);
        if (imageFile == null || thumbnailFile == null) return ResponseEntity.badRequest().body(null);

        ImageFile image = this.assetService.saveImage(imageFile);
        ImageFile thumbnail = this.assetService.saveImage(thumbnailFile);

        if (image == null || thumbnail == null) {
            return ResponseEntity.badRequest().body(null);
        } else {
            Asset asset = this.assetService.saveAsset(name, assetType, image, thumbnail);
            return ResponseEntity.ok(asset);
        }
    }
}

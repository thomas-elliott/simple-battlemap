package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.AssetType;
import com.github.thomaselliott.simplebattlemap.model.ImageFile;
import com.github.thomaselliott.simplebattlemap.model.exception.BadRequestException;
import com.github.thomaselliott.simplebattlemap.service.AssetService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/asset")
public class AssetController implements AssetApi {
    private AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @Override
    public Page<Asset> getImages(Pageable pageable) {
        return this.assetService.getAllAssets(pageable);
    }

    @Override
    public Page<Asset> getImagesOfType(String type, Pageable pageable) {
        AssetType assetType = AssetType.fromString(type);

        if (assetType == null) {
            throw new BadRequestException("There is no token of type " + type);
        }

        return this.assetService.getAllByType(assetType, pageable);
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

    @Override
    public ResponseEntity<String> deleteImage(String id) {
        this.assetService.deleteAsset(id);
        return ResponseEntity.ok("deleted");
    }

    @Override
    public ResponseEntity<String> uploadImage(
            String name,
            String type,
            MultipartFile imageFile,
            MultipartFile thumbnailFile
    ) {
        AssetType assetType = AssetType.fromString(type);
        if (imageFile == null || thumbnailFile == null) return ResponseEntity.badRequest().body(null);

        ImageFile image = this.assetService.saveImage(imageFile);
        ImageFile thumbnail = this.assetService.saveImage(thumbnailFile);

        if (image == null || thumbnail == null) {
            return ResponseEntity.badRequest().body(null);
        } else {
            Asset asset = this.assetService.saveAsset(name, assetType, image, thumbnail);
            return ResponseEntity.ok(asset.getName());
        }
    }
}

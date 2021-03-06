package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.AssetType;
import com.github.thomaselliott.simplebattlemap.model.ImageFile;
import com.github.thomaselliott.simplebattlemap.model.ImageFileType;
import com.github.thomaselliott.simplebattlemap.repository.AssetRepository;
import com.github.thomaselliott.simplebattlemap.repository.ImageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AssetService {
    private AssetRepository assetRepository;
    private ImageStoreService imageStoreService;

    @Autowired
    public AssetService(AssetRepository assetRepository,
                        ImageStoreService imageStoreService) {
        this.assetRepository = assetRepository;
        this.imageStoreService = imageStoreService;
    }

    @Transactional
    public Page<Asset> getAllAssets(Pageable pageable) {
        return assetRepository.findAll(pageable);
    }

    @Transactional
    public Page<Asset> getAllByType(AssetType type, Pageable pageable) {
        return assetRepository.findAllByType(type, pageable);
    }

    @Transactional
    public Page<Asset> getAllByName(String name, Pageable pageable) {
        return assetRepository.findAllByName(name, pageable);
    }

    public byte[] getImage(Long assetId) {
        Optional<Asset> asset = this.assetRepository.findById(assetId);
        return asset.map(value -> value.getImage().getData()).orElse(null);
    }

    @Transactional
    public byte[] getThumbnail(Long assetId) {
        Optional<Asset> asset = this.assetRepository.findById(assetId);
        return asset.map(value -> value.getThumbnail().getData()).orElse(null);
    }

    @Transactional
    public Asset saveAsset(String name, AssetType type, ImageFile image, ImageFile thumbnail) {
        Asset asset = new Asset();
        asset.setName(name);
        asset.setType(type);
        asset.setImage(image);
        asset.setThumbnail(thumbnail);

        return assetRepository.save(asset);
    }

    @Transactional
    public ImageFile saveImage(@NonNull MultipartFile file) {
        ImageFile image = new ImageFile();
        image.setFileName(file.getOriginalFilename());
        image.setContentType(file.getContentType());

        try {
            imageStoreService.saveImage(file.getBytes(), ImageFileType.fromString(file.getContentType()));
        } catch (IOException e) {
            log.error("Error converting file {}", file.getName(), e);
            return null;
        }

        return image;
    }

    public void deleteAsset(String id) {
        Long lId = Long.valueOf(id);
        this.assetRepository.deleteById(lId);
    }

    public Asset getAsset(Long mapId) {
        Optional<Asset> asset = this.assetRepository.findById(mapId);
        return asset.orElse(null);
    }
}

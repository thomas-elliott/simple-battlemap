package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.AssetType;
import com.github.thomaselliott.simplebattlemap.model.Image;
import com.github.thomaselliott.simplebattlemap.model.Thumbnail;
import com.github.thomaselliott.simplebattlemap.repository.AssetRepository;
import com.github.thomaselliott.simplebattlemap.repository.ImageRepository;
import com.github.thomaselliott.simplebattlemap.repository.ThumbnailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AssetService {
    private AssetRepository assetRepository;
    private ImageRepository imageRepository;
    private ThumbnailRepository thumbnailRepository;

    @Autowired
    public AssetService(AssetRepository assetRepository,
                        ImageRepository imageRepository,
                        ThumbnailRepository thumbnailRepository) {
        this.assetRepository = assetRepository;
        this.imageRepository = imageRepository;
        this.thumbnailRepository = thumbnailRepository;
    }

    public Page<Asset> getAllAssets(Pageable pageable) {
        return assetRepository.findAll(pageable);
    }

    public Page<Asset> getAllByType(AssetType type, Pageable pageable) {
        return assetRepository.findAllByType(type, pageable);
    }

    public Page<Asset> getAllByName(String name, Pageable pageable) {
        return assetRepository.findAllByName(name, pageable);
    }

    @Transactional
    public Asset saveAsset(String name, AssetType type, Image image, Thumbnail thumbnail) {
        Asset asset = new Asset();
        asset.setName(name);
        asset.setType(type);
        asset.setImage(image);
        asset.setThumbnail(thumbnail);

        return assetRepository.save(asset);
    }

    @Transactional
    public Image saveImage(@NonNull MultipartFile file) {
        Image image = new Image();
        image.setFileName(file.getOriginalFilename());
        image.setContentType(file.getContentType());

        try {
            image.setData(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting file {}", file.getName(), e);
            return null;
        }

        return imageRepository.save(image);
    }

    @Transactional
    public Thumbnail saveThumbnail(@NonNull MultipartFile file) {
        Thumbnail thumbnail = new Thumbnail();

        try {
            thumbnail.setData(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting file {}", file.getName(), e);
            return null;
        }

        return thumbnailRepository.save(thumbnail);
    }
}

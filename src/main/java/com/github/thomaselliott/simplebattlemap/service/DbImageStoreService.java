package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.ImageFile;
import com.github.thomaselliott.simplebattlemap.model.ImageFileType;
import com.github.thomaselliott.simplebattlemap.repository.ImageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DbImageStoreService implements ImageStoreService {
    ImageRepository imageRepository;

    @Autowired
    public DbImageStoreService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public String saveImage(byte[] image, ImageFileType fileType) {
        ImageFile imageFile = new ImageFile();
        imageFile.setData(image);
        imageFile.setContentType(fileType.toString());
        imageRepository.save(imageFile);
        return imageFile.getId().toString();
    }

    @Override
    public byte[] getImage(Long imageId) {
        Optional<ImageFile> imageFile = imageRepository.findById(imageId);

        return imageFile.map(ImageFile::getData).orElse(null);
    }
}

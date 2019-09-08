package com.github.thomaselliott.simplebattlemap.repository;

import com.github.thomaselliott.simplebattlemap.model.Image;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}

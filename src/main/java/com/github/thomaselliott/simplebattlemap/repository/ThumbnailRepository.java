package com.github.thomaselliott.simplebattlemap.repository;

import com.github.thomaselliott.simplebattlemap.model.Thumbnail;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ThumbnailRepository extends JpaRepository<Thumbnail, Long> {
}

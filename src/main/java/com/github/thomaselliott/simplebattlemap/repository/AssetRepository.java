package com.github.thomaselliott.simplebattlemap.repository;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.AssetType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Page<Asset> findAllByType(AssetType type, Pageable pageable);
    Page<Asset> findAllByName(String name, Pageable pageable);
}

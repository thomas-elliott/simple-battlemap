package com.github.thomaselliott.simplebattlemap.repository;

import com.github.thomaselliott.simplebattlemap.model.BattleMap;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MapRepository extends JpaRepository<BattleMap, Long> {
}

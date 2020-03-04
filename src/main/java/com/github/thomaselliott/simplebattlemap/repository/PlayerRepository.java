package com.github.thomaselliott.simplebattlemap.repository;

import com.github.thomaselliott.simplebattlemap.model.Player;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByUsername(String username);
    boolean existsByUsername(String username);
}

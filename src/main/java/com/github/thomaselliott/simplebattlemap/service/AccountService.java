package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Player;
import com.github.thomaselliott.simplebattlemap.repository.PlayerRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private PlayerRepository playerRepository;

    public AccountService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Optional<Player> getPlayer(String username) {
        return playerRepository.findByUsername(username);
    }
}

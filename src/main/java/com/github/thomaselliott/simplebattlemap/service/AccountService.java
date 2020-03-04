package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Player;
import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;
import com.github.thomaselliott.simplebattlemap.model.RegistrationRequest;
import com.github.thomaselliott.simplebattlemap.model.exception.RegistrationException;
import com.github.thomaselliott.simplebattlemap.repository.PlayerRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AccountService implements UserDetailsService {
    private PlayerRepository playerRepository;

    public AccountService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Optional<Player> getPlayer(String username) {
        return playerRepository.findByUsername(username);
    }

    public Player registerPlayer(RegistrationRequest request) throws RegistrationException {
        // Lookup existing user
        if (playerRepository.existsByUsername(request.getUsername())) {
            throw new RegistrationException("That username already exists");
        }

        Player player = request.toPlayer();
        return playerRepository.save(player);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        log.info("Trying to find username " + s);
        Optional<Player> player = getPlayer(s);

        if (player.isPresent()) {
            return new PlayerDetails(player.get());
        } else {
            throw new UsernameNotFoundException("Could not find username");
        }
    }
}

package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Player;
import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;
import com.github.thomaselliott.simplebattlemap.model.RegistrationRequest;
import com.github.thomaselliott.simplebattlemap.model.exception.RegistrationException;
import com.github.thomaselliott.simplebattlemap.repository.PlayerRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
        long startTime = System.currentTimeMillis();
        Optional<Player> player = playerRepository.findByUsername(username);
        log.debug("getPlayer: Loading player {} from database. Exists: {}. Took {}ms.",
                username, player.isPresent(), System.currentTimeMillis() - startTime);
        return player;
    }

    public Player registerPlayer(RegistrationRequest request) throws RegistrationException {
        // Lookup existing user
        long startTime = System.currentTimeMillis();
        if (playerRepository.existsByUsername(request.getUsername())) {
            throw new RegistrationException("That username already exists");
        }

        Player player = request.toPlayer();
        player.setPassword(encryptPassword(request.getPassword()));
        Player savedPlayer = playerRepository.save(player);
        log.debug("registerPlayer: Saving player {} to database. Took {}ms.",
                player.getUsername(), System.currentTimeMillis() - startTime);
        return savedPlayer;
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

    private String encryptPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        return encoder.encode(password);
    }
}

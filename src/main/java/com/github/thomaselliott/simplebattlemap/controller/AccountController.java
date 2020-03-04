package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Player;
import com.github.thomaselliott.simplebattlemap.model.exception.ApiException;
import com.github.thomaselliott.simplebattlemap.service.AccountService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

@RestController
public class AccountController implements AccountApi {
    private AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public ResponseEntity<String> login() {
        return null;
    }

    @Override
    public ResponseEntity<String> register() {
        return null;
    }

    @Override
    public ResponseEntity<String> logout() {
        return null;
    }

    @Override
    public ResponseEntity<Player> user(Principal user) throws ApiException {
        Optional<Player> oPlayer = accountService.getPlayer(user.getName());

        if (oPlayer.isEmpty()) throw new ApiException("Player not found");

        return ResponseEntity.ok(oPlayer.get());
    }
}

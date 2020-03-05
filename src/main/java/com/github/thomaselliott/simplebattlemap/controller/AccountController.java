package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Player;
import com.github.thomaselliott.simplebattlemap.model.RegistrationRequest;
import com.github.thomaselliott.simplebattlemap.model.exception.ApiException;
import com.github.thomaselliott.simplebattlemap.model.exception.NotAuthenticatedException;
import com.github.thomaselliott.simplebattlemap.model.exception.RegistrationException;
import com.github.thomaselliott.simplebattlemap.service.AccountService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;

@Slf4j
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
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        SecurityContextHolder.clearContext();

        if (session != null) {
            session.invalidate();
        }

        for (Cookie cookie : request.getCookies()) {
            cookie.setMaxAge(0);
        }

        log.info ("Logout successful");

        return ResponseEntity.ok("logout");
    }

    @Override
    public ResponseEntity<Player> register(RegistrationRequest request) throws RegistrationException {
        Player player = accountService.registerPlayer(request);
        return ResponseEntity.ok(player);
    }

    @Override
    public ResponseEntity<Player> user(Principal user) throws NotAuthenticatedException {
        if (user == null) throw new NotAuthenticatedException("No authentication details found");

        Optional<Player> oPlayer = accountService.getPlayer(user.getName());

        if (oPlayer.isEmpty()) throw new NotAuthenticatedException("Player not found");

        return ResponseEntity.ok(oPlayer.get());
    }
}

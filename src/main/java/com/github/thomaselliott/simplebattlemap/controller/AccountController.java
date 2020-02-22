package com.github.thomaselliott.simplebattlemap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AccountController implements AccountApi {
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
    public ResponseEntity<Principal> user(Principal user) {
        return ResponseEntity.ok(user);
    }
}

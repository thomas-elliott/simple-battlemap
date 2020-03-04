package com.github.thomaselliott.simplebattlemap.model;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String name;
    private String email;
    private String username;
    private String password;

    public Player toPlayer() {
        Player player = new Player();
        player.setName(name);
        player.setEmail(email);
        player.setUsername(username);
        player.setPassword(password);
        return player;
    }
}

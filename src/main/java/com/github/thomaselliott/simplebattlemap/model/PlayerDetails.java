package com.github.thomaselliott.simplebattlemap.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class PlayerDetails implements UserDetails {
    private String username;
    private String password;
    private boolean expired;
    private boolean locked;
    private boolean enabled;
    private boolean isDm;

    public PlayerDetails(Player player) {
        this.username = player.getUsername();
        this.password = player.getPassword();

        this.isDm = player.isDm();
        this.expired = false;
        this.locked = false;
        this.enabled = true;
    }

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        if (isDm) {
            ArrayList dm = new ArrayList<SimpleGrantedAuthority>();
            dm.add(new SimpleGrantedAuthority("DM"));
            return dm;
        } else {
            ArrayList player = new ArrayList<SimpleGrantedAuthority>();
            player.add(new SimpleGrantedAuthority("PLAYER"));
            return player;
        }
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !expired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}


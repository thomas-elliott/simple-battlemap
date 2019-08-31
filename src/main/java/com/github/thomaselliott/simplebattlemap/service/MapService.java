package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Map;
import com.github.thomaselliott.simplebattlemap.model.Token;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MapService {
    private Map map;

    public MapService() {
        createMap();
    }

    public void createMap() {
        this.map = new Map();
    }

    public String getBackgroundImage() {
        return map.getBackgroundImagePath();
    }

    public List<Token> getTokens() {
        return new ArrayList<>(map.getTokens().values());
    }

    public void addToken(Token token) {
        if (token.getId() != null && map.containsToken(token)) {
            log.info("Duplicate token: ({}) {}", token.getId(), token.getName());
            return;
        }

        token.setId(map.getNextId());

        map.addToken(token);
    }

    public void moveToken(int id, int x, int y) {
        map.moveToken(id, x, y);
    }

    public void updateToken(Token token) {
        if (!map.containsToken(token)) {
            log.info("Could not find token to remove: ({}) {}", token.getId(), token.getName());
            return;
        }

        map.updateToken(token);
    }

    public void removeToken(Token token) {
        map.removeToken(token);
    }
}

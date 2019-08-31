package com.github.thomaselliott.simplebattlemap.model;

import java.util.HashMap;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
public class Map {
    private Grid grid;
    private HashMap<Integer, Token> tokens;
    private String backgroundImagePath;

    public Map() {}

    public Map(String backgroundImagePath, int gridWidth, int gridHeight) {
        this.backgroundImagePath = backgroundImagePath;
        tokens = new HashMap<>();
        grid = new Grid();
        grid.setWidth(gridWidth);
        grid.setHeight(gridHeight);
    }

    public Integer getNextId() {
        int potentialId = tokens.entrySet().size() + 1;
        log.debug("Trying id: {}", potentialId);

        if (tokens.containsKey(potentialId)) {
            return getNextId();
        }

        return potentialId;
    }

    public void addToken(Token token) {
        tokens.put(token.getId(), token);
    }

    public void updateToken(Token token) {
        tokens.put(token.getId(), token);
    }

    public void removeToken(Token token) {
        tokens.remove(token.getId());
    }

    public void moveToken(int id, int x, int y) {
        Token token = tokens.get(id);
        token.setX(x);
        token.setY(y);
    }

    public boolean containsToken(Token token) {
        return tokens.containsKey(token.getId());
    }
}

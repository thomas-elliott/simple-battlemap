package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Map;
import com.github.thomaselliott.simplebattlemap.model.Token;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MapService {
    private Map map;
    private SimpMessagingTemplate messagingTemplate;

    public MapService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        createMap();
    }

    public void createMap() {
        this.map = new Map("", 30, 22);
    }

    public String getBackgroundImage() {
        return map.getBackgroundImagePath();
    }

    public List<Token> getTokens() {
        HashMap<Integer, Token> tokens = map.getTokens();
        ArrayList<Token> tokenList = new ArrayList<>();

        for (Token token : tokens.values()) {
            tokenList.add(token);
        }

        return tokenList;
    }

    public void sendUpdates() {
        messagingTemplate.convertAndSend("/topic/tokens", "Send manually");
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

        messagingTemplate.convertAndSend("/topic/tokens", "Send after move");
        log.info("Size of tokens: {}", map.getTokens().size());
    }

    public void updateToken(Token token) {
        if (!map.containsToken(token)) {
            log.info("Could not find token to remove: ({}) {}", token.getId(), token.getName());
            return;
        }

        map.updateToken(token);
    }

    public void removeToken(Integer id) {
        map.removeToken(id);
    }
}

package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.repository.MapRepository;
import com.github.thomaselliott.simplebattlemap.repository.TokenRepository;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MapService {
    private BattleMap battleMap;
    private MapRepository mapRepository;
    private TokenRepository tokenRepository;
    private SimpMessagingTemplate messagingTemplate;

    public MapService(SimpMessagingTemplate messagingTemplate,
                      MapRepository mapRepository,
                      TokenRepository tokenRepository) {
        this.messagingTemplate = messagingTemplate;
        this.tokenRepository = tokenRepository;
        this.mapRepository = mapRepository;

        // TODO: Temporary
        battleMap = new BattleMap();
    }

    public boolean loadMap(Long id) {
        Optional<BattleMap> map = mapRepository.findById(id);
        if (map.isPresent()) {
            battleMap = null;
            battleMap = map.get();
            return true;
        } else {
            return false;
        }
    }

    public void saveMap() {
        tokenRepository.saveAll(battleMap.getTokens().values());
        mapRepository.save(battleMap);
    }

    public Asset getBackgroundImage() {
        return battleMap.getBackgroundImage();
    }

    public List<Token> getTokens() {
        Map<Long, Token> tokens = battleMap.getTokens();

        ArrayList<Token> tokenList = new ArrayList<>(tokens.values());

        return tokenList;
    }

    public void sendUpdates() {
        messagingTemplate.convertAndSend("/topic/tokens", "Send manually");
    }

    public void addToken(Token token) {
        if (token.getId() != null && battleMap.containsToken(token)) {
            log.info("Duplicate token: ({}) {}", token.getId(), token.getName());
            return;
        }

        battleMap.addToken(token);
        tokenRepository.save(token);
        messagingTemplate.convertAndSend("/topic/tokens", "Send after add");
    }

    public void moveToken(Long id, int x, int y) {
        Optional<Token> oToken = tokenRepository.findById(id);
        if (oToken.isEmpty()) {
            log.error("Can't find token");
            return;
        }

        Token token = oToken.get();
        if (!battleMap.containsToken(token)) {
            battleMap.addToken(token);
        }

        battleMap.moveToken(id, x, y);
        token.setX(x);
        token.setY(y);
        tokenRepository.save(token);

        messagingTemplate.convertAndSend("/topic/tokens", "Send after move");
        log.info("Size of tokens: {}", battleMap.getTokens().size());
    }

    public void updateToken(Token token) {
        if (!battleMap.containsToken(token)) {
            log.info("Could not find token to remove: ({}) {}", token.getId(), token.getName());
            return;
        }

        battleMap.updateToken(token);
    }

    public void removeToken(Long id) {
        battleMap.removeToken(id);

        Optional<Token> oToken = tokenRepository.findById(id);
        if (oToken.isEmpty()) {
            log.error("Can't find token");
            return;
        }

        Token token = oToken.get();
        tokenRepository.delete(token);
        messagingTemplate.convertAndSend("/topic/tokens", "Send after remove");
    }
}

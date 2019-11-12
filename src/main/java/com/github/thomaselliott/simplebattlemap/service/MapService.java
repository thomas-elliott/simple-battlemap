package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.BattleMapUpdateRequest;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.repository.AssetRepository;
import com.github.thomaselliott.simplebattlemap.repository.MapRepository;
import com.github.thomaselliott.simplebattlemap.repository.TokenRepository;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MapService {
    private AssetRepository assetRepository;
    private BattleMap battleMap;
    private MapRepository mapRepository;
    private TokenRepository tokenRepository;
    private SimpMessagingTemplate messagingTemplate;

    public MapService(AssetRepository assetRepository,
                      SimpMessagingTemplate messagingTemplate,
                      MapRepository mapRepository,
                      TokenRepository tokenRepository) {
        this.assetRepository = assetRepository;
        this.messagingTemplate = messagingTemplate;
        this.tokenRepository = tokenRepository;
        this.mapRepository = mapRepository;
    }

    public Long getMapId() {
        if (battleMap == null) return null;
        return battleMap.getId();
    }

    @Transactional
    public boolean loadMap(Long id) {
        Optional<BattleMap> map = mapRepository.findById(id);
        if (map.isPresent()) {
            battleMap = null;
            battleMap = map.get();

            messagingTemplate.convertAndSend("/topic/maps", "Map loaded");
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public void newMap(Long backgroundImageId) {
        Optional<Asset> image = assetRepository.findById(backgroundImageId);
        if (!image.isPresent()) return;

        this.battleMap = new BattleMap();
        battleMap.setBackgroundImage(image.get());
        mapRepository.save(this.battleMap);
        messagingTemplate.convertAndSend("/topic/maps", "Map loaded");
    }

    @Transactional
    public void saveMap() {
        if (battleMap == null) return;

        tokenRepository.saveAll(battleMap.getTokens().values());
        mapRepository.save(battleMap);
    }

    @Transactional
    public List<Token> getTokens() {
        if (battleMap == null) return new ArrayList<>();

        Map<Long, Token> tokens = battleMap.getTokens();

        return new ArrayList<>(tokens.values());
    }

    public void sendUpdates() {
        messagingTemplate.convertAndSend("/topic/tokens", "Send manually");
    }

    @Transactional
    public void addToken(Token token) {
        if (battleMap == null) return;

        if (token.getId() != null && battleMap.containsToken(token)) {
            log.info("Duplicate token: ({}) {}", token.getId(), token.getName());
            return;
        }

        tokenRepository.save(token);
        battleMap.addToken(token);
        mapRepository.save(battleMap);
        messagingTemplate.convertAndSend("/topic/tokens", "Send after add");
    }

    @Transactional
    public void moveToken(Long id, int x, int y) {
        if (battleMap == null) return;

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
        if (battleMap == null) return;

        if (!battleMap.containsToken(token)) {
            log.info("Could not find token to update: ({}) {}", token.getId(), token.getName());
            return;
        }

        battleMap.updateToken(token);
    }

    @Transactional
    public void removeToken(Long id) {
        if (battleMap == null) return;

        battleMap.removeToken(id);
        mapRepository.save(battleMap);

        Optional<Token> oToken = tokenRepository.findById(id);
        if (oToken.isEmpty()) {
            log.error("Can't find token");
            return;
        }

        Token token = oToken.get();
        tokenRepository.delete(token);
        messagingTemplate.convertAndSend("/topic/tokens", "Send after remove");
    }

    @Transactional
    public boolean changeImageAsset(Long imageId) {
        if (battleMap == null) return false;

        Optional<Asset> oAsset = assetRepository.findById(imageId);

        if (oAsset.isPresent()) {
            battleMap.setBackgroundImage(oAsset.get());
            mapRepository.save(battleMap);
            messagingTemplate.convertAndSend("/topic/maps", "Image asset updated");
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public void updateMap(BattleMapUpdateRequest map) {
        Long id = map.getId();
        if (battleMap == null || !battleMap.getId().equals(id)) {
            throw new IllegalArgumentException("Map null or does not match");
        }

        // Update only the settings
        if (!StringUtils.isEmpty(map.getName())) {
            battleMap.setName(map.getName());
        }

        battleMap.setGridHeight(map.getGridHeight());
        battleMap.setGridWidth(map.getGridWidth());
        battleMap.setGridLineWidth(map.getGridLineWidth());

        mapRepository.save(battleMap);
        messagingTemplate.convertAndSend("/topic/maps", "Map info updated");
    }

    @Transactional
    public boolean deleteMap(Long id) {
        Optional<BattleMap> map = mapRepository.findById(id);
        if (map.isPresent()) {
            if (battleMap == map.get()) {
                log.error("Can't remove map {} which is already loaded", id);
                return false;
            }

            mapRepository.delete(map.get());
            return true;
        } else {
            return false;
        }
    }
}

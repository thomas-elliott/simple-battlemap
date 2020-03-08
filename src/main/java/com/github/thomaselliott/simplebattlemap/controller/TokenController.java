package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.model.TokenRequest;
import com.github.thomaselliott.simplebattlemap.model.exception.NoSessionException;
import com.github.thomaselliott.simplebattlemap.service.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class TokenController implements TokenApi {
    private SessionService sessionService;

    @Autowired
    public TokenController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public ResponseEntity<List<Token>> getTokens(PlayerDetails player)
            throws NoSessionException {
        List<Token> tokens = sessionService.getTokens(player.getUsername());
        return ResponseEntity.ok(tokens);
    }

    public ResponseEntity<Boolean> addToken(TokenRequest tokenRequest, PlayerDetails player)
            throws NoSessionException {
        if (tokenRequest != null && tokenRequest.getToken() != null) {
            Token token = tokenRequest.getToken();

            if (StringUtils.isEmpty(token.getName()) ||
                token.getImageAsset() == null ||
                (token.getX() == 0 && token.getY() == 0)) {
                log.info("Incomplete token info: {}", token);
                return ResponseEntity.badRequest().body(null);
            }

            sessionService.addToken(token, player.getUsername());
            return ResponseEntity.ok(null);
        } else {
            log.warn("Tried to add null token");
            return ResponseEntity.badRequest().body(null);
        }
    }

    public ResponseEntity<Boolean> updateToken(Token token, PlayerDetails player)
            throws NoSessionException {
        if (token != null && token.getId() != null) {
            sessionService.moveToken(token.getId(), token.getX(), token.getY(), player.getUsername());
        } else {
            log.warn("Tried to move null token");
        }
        sessionService.sendUpdates();
        return ResponseEntity.ok(false);
    }

    public ResponseEntity<Boolean> deleteToken(Long tokenId, PlayerDetails player)
            throws NoSessionException {
        sessionService.removeToken(tokenId, player.getUsername());
        return ResponseEntity.ok(false);
    }
}

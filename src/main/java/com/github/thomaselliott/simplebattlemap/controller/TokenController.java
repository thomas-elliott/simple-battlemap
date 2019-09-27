package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.model.TokenRequest;
import com.github.thomaselliott.simplebattlemap.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@RequestMapping(value = "/token")
public class TokenController {
    private MapService mapService;

    @Autowired
    public TokenController(MapService mapService) {
        this.mapService = mapService;
    }

    @RequestMapping(value = "")
    public List<Token> getTokens() {
        return mapService.getTokens();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addToken(@RequestBody TokenRequest tokenRequest) {
        if (tokenRequest != null && tokenRequest.getToken() != null) {
            Token token = tokenRequest.getToken();

            if (StringUtils.isEmpty(token.getName()) ||
                token.getImageAsset() == null ||
                (token.getX() == 0 && token.getY() == 0)) {
                log.info("Incomplete token info");
                return ResponseEntity.badRequest().body(null);
            }

            mapService.addToken(token);
            return ResponseEntity.ok(null);
        } else {
            log.warn("Tried to add null token");
            return ResponseEntity.badRequest().body(null);
        }
    }

    @RequestMapping(value = "/move", method = RequestMethod.PUT)
    public void moveToken(@RequestBody Token token) {
        if (token != null && token.getId() != null) {
            mapService.moveToken(token.getId(), token.getX(), token.getY());
        } else {
            log.warn("Tried to move null token");
        }
        mapService.sendUpdates();
    }

    @RequestMapping(value = "/remove/{id}", method = RequestMethod.DELETE)
    public void removeToken(@PathVariable Long id) {
        mapService.removeToken(id);
    }
}

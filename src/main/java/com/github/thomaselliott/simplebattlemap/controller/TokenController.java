package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
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
    public void addToken(@RequestBody Token token) {
        if (token != null) {
            mapService.addToken(token);
        } else {
            log.warn("Tried to add null token");
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

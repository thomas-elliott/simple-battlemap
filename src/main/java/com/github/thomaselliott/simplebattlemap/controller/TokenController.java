package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.service.MapService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/token")
public class TokenController {
    private MapService mapService;

    public TokenController(MapService mapService) {
        this.mapService = mapService;
    }

    @RequestMapping(value = "")
    public List<Token> getTokens() {
        return mapService.getTokens();
    }

    @RequestMapping(value = "/add")
    public void addToken(@RequestBody Token token) {
        this.mapService.addToken(token);
    }

    @RequestMapping(value = "/move")
    public void moveToken(@RequestBody Token token) {
        this.mapService.moveToken(token.getId(), token.getX(), token.getY());
    }

    @RequestMapping(value = "/remove")
    public void removeToken(@RequestBody Token token) {
        this.mapService.removeToken(token);
    }
}

package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Map;
import com.github.thomaselliott.simplebattlemap.model.Token;

import org.springframework.stereotype.Service;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MapService {
    private Map map;

    public MapService() {
    }

    public String getBackgroundImage() {
        return map.getBackgroundImagePath();
    }

    public List<Token> getTokens() {
        return map.getTokens();
    }

}

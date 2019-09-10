package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/map")
public class MapController {
    private MapService mapService;

    @Autowired
    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @RequestMapping(value = "/load/{id}", method = RequestMethod.POST)
    public boolean postLoadMap(@PathVariable(name = "id") Long id) {
        log.info("Attempting to load map: {}", id);
        boolean successful = mapService.loadMap(id);
        return successful;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void postSaveMap() {
        log.info("Attempting to save map");
        mapService.saveMap();
    }
}

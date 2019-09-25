package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.MapInfoResponse;
import com.github.thomaselliott.simplebattlemap.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public MapInfoResponse getMapInfo() {
        log.info("Request for map info");

        MapInfoResponse mapInfoResponse = new MapInfoResponse();
        mapInfoResponse.setMapId(mapService.getMapId());

        return mapInfoResponse;
    }

    @RequestMapping(value = "/image/{id}", method = RequestMethod.PUT)
    public void putUpdateImage(@PathVariable(name = "id") Long imageId) {
        boolean successful = mapService.changeImageAsset(imageId);
        log.info("Changing image id for map. Success={}", successful);
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

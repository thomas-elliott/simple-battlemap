package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.BattleMapUpdateRequest;
import com.github.thomaselliott.simplebattlemap.model.MapInfoResponse;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MapController implements MapApi {
    private MapService mapService;

    @Autowired
    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @RequestMapping(value = "/image/{id}", method = RequestMethod.PUT)
    public void putUpdateImage(@PathVariable(name = "id") Long imageId) {
        //boolean successful = mapService.changeImageAsset(imageId);
        //log.info("Changing image id for map. Success={}", successful);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public boolean deleteMap(@PathVariable(name = "id") Long id) {
        log.info("Attempting to delete map: {}", id);
        return mapService.deleteMap(id);
    }

    @RequestMapping(value = "/tokens", method = RequestMethod.GET)
    public List<Token> getTokens() {
        // TODO: Fix
        //return mapService.getTokens();
        return null;
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public void postUpdateMap(@RequestBody BattleMapUpdateRequest map) {
        log.info("Updating map");
        //mapService.updateMap(map);
    }

    // New methods

    @Override
    public Page<BattleMap> getMapList(Pageable pageable) {
        return mapService.listMaps(pageable);
    }

    @Override
    public ResponseEntity<BattleMap> getMap(Long id) {
        BattleMap map = mapService.getMap(id);
        if (map != null) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Boolean> loadMap(@PathVariable(name = "id") Long id) {
        log.info("Attempting to load map: {}", id);
        boolean successful = true; //mapService.loadMap(id);
        return ResponseEntity.ok(successful);
    }

    @Override
    public ResponseEntity<Boolean> newMap(@PathVariable(name = "id") Long id) {
        log.info("Creating new map");
        //this.mapService.newMap(id);
        return ResponseEntity.ok(true);
    }

    @Override
    public void saveMap() {
        log.info("Attempting to save map");
        //mapService.saveMap();
    }
}

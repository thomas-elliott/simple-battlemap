package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.BattleMapUpdateRequest;
import com.github.thomaselliott.simplebattlemap.model.MapInfoResponse;
import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;
import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.model.exception.NoSessionException;
import com.github.thomaselliott.simplebattlemap.service.MapService;
import com.github.thomaselliott.simplebattlemap.service.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    private SessionService sessionService;

    @Autowired
    public MapController(MapService mapService,
                         SessionService sessionService) {
        this.mapService = mapService;
        this.sessionService = sessionService;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public boolean deleteMap(@PathVariable(name = "id") Long id) {
        log.info("Attempting to delete map: {}", id);
        return mapService.deleteMap(id);
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
    public ResponseEntity<BattleMap> getMapInfo(PlayerDetails player) throws NoSessionException {
        Session session = sessionService.getPlayerSession(player.getUsername());

        BattleMap map = session.getMap();
        if (map != null) {
            return ResponseEntity.ok(map);
        }

        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Boolean> loadMap(Long mapId, PlayerDetails player) throws NoSessionException {
        log.info("Attempting to load map: {}", mapId);
        BattleMap map = mapService.loadMap(mapId);

        boolean successful = false;
        if (map != null) {
            sessionService.setMap(player.getUsername(), map);
        }
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

package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "map", produces = "application/json")
@RequestMapping(value = "/map",
        produces = { "application/json" })
public interface MapApi {
    @ApiOperation(value = "List maps",
            nickname = "listMaps")
    @RequestMapping(value = "/",
            method = RequestMethod.GET)
    Page<BattleMap> getMapList(
            @ApiParam(value = "Paging controls") Pageable pageable
    );

    @ApiOperation(value = "Get map info", nickname = "getMapInfo")
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    ResponseEntity<BattleMap> getMapInfo(
            @AuthenticationPrincipal PlayerDetails player);

    @ApiOperation(value = "Load map",
            nickname = "loadMap")
    @RequestMapping(value = "/load/{id}",
            method = RequestMethod.POST)
    ResponseEntity<Boolean> loadMap(
            @ApiParam(value = "Map id") @PathVariable(value = "id") Long id,
            @AuthenticationPrincipal PlayerDetails player);

    @ApiOperation(value = "New map",
            nickname = "newMap")
    @RequestMapping(value = "/new/{id}",
            method = RequestMethod.POST)
    ResponseEntity<Boolean> newMap(
            @ApiParam(value = "Map id") @PathVariable(value = "id") Long id);

    @ApiOperation(value = "Save map",
            nickname = "saveMap")
    @RequestMapping(value = "/save",
            method = RequestMethod.POST)
    void saveMap();
}

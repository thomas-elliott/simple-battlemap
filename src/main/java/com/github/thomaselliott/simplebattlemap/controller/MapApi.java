package com.github.thomaselliott.simplebattlemap.controller;

import org.springframework.http.ResponseEntity;
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
    ResponseEntity<String> getMapList();


    @ApiOperation(value = "Load map",
            nickname = "loadMap")
    @RequestMapping(value = "/load/{id}",
            method = RequestMethod.POST)
    ResponseEntity<Boolean> loadMap(@ApiParam(value = "Map id") Long id);

    @ApiOperation(value = "New map",
            nickname = "newMap")
    @RequestMapping(value = "/new",
            method = RequestMethod.POST)
    ResponseEntity<Boolean> newMap(@ApiParam(value = "Map id") Long id);

    @ApiOperation(value = "Save map",
            nickname = "saveMap")
    @RequestMapping(value = "/save",
            method = RequestMethod.POST)
    void saveMap();
}

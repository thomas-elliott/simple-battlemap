package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Asset;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @ApiOperation(value = "Load map",
            nickname = "loadMap")
    @RequestMapping(value = "/load/{id}",
            method = RequestMethod.POST)
    ResponseEntity<String> loadMap(
            @ApiParam(value = "Map id") String id
    );

    @ApiOperation(value = "New map",
            nickname = "newMap")
    @RequestMapping(value = "/new",
            method = RequestMethod.POST)
    ResponseEntity<String> newMap();

    @ApiOperation(value = "Save map",
            nickname = "saveMap")
    @RequestMapping(value = "/save",
            method = RequestMethod.POST)
    ResponseEntity<String> saveMap();
}

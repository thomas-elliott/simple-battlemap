package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.service.MapService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/background")
public class BackgroundController {
    private MapService mapService;

    public BackgroundController(MapService mapService) {
        this.mapService = mapService;
    }

    @RequestMapping("/image")
    public String getBackgroundImage() {
        return mapService.getBackgroundImage();
    }
}

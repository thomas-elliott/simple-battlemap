package com.github.thomaselliott.simplebattlemap.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "image", produces = MediaType.APPLICATION_JSON_VALUE)
@RequestMapping(value = "/image",
        produces = { "application/json" })
public interface ImageApi {
    @ApiOperation(value = "Get thumbnail",
            nickname = "getThumbnail")
    @RequestMapping(value = "/{id}/thumbnail.png",
            method = RequestMethod.GET)
    ResponseEntity<byte[]> getThumbnail(@ApiParam(value = "Image ID") @PathVariable("id") Long id);

    @ApiOperation(value = "Get image",
            nickname = "getImage")
    @RequestMapping(value = "/{id}/image.png",
            method = RequestMethod.GET)
    ResponseEntity<byte[]> getImage(@ApiParam(value = "Image ID") @PathVariable("id") Long id);
}

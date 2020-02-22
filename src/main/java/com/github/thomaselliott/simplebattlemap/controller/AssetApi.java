package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Asset;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "asset", produces = MediaType.APPLICATION_JSON_VALUE)
@RequestMapping(value = "/asset",
        produces = { "application/json" })
public interface AssetApi {
    @ApiOperation(value = "Get a list of all images",
            nickname = "getImages")
    @RequestMapping(value = "/",
            method = RequestMethod.GET)
    Page<Asset> getImages(
            @ApiParam(value = "Paging controls") Pageable pageable
    );

    @ApiOperation(value = "Get a list of all images of a type",
            nickname = "getImagesType")
    @RequestMapping(value = "/{type}",
            method = RequestMethod.GET)
    Page<Asset> getImagesOfType(
            @ApiParam(value = "Type of image") @PathVariable("type") String type,
            @ApiParam(value = "Paging controls") Pageable pageable
    );

    @ApiOperation(value = "Get image url",
            nickname = "getImage")
    @RequestMapping(value = "/{id}",
            produces = MediaType.IMAGE_PNG_VALUE,
            method = RequestMethod.GET)
    ResponseEntity<byte[]> getImage(
            @ApiParam(value = "Id of image") @PathVariable("id") Long id
    );

    @ApiOperation(value = "Delete image",
            nickname = "deleteImage")
    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE)
    ResponseEntity<String> deleteImage(
            @ApiParam(value = "Id of image") @PathVariable("id") String id
    );

    @ApiOperation(value = "Upload image",
            nickname = "uploadImage")
    @RequestMapping(value = "/upload",
            method = RequestMethod.POST)
    ResponseEntity<String> uploadImage(
            @RequestParam String name,
            @RequestParam String type,
            @RequestParam MultipartFile imageFile,
            @RequestParam MultipartFile thumbnailFile
    );
}

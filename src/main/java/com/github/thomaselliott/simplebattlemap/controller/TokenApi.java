package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.model.TokenRequest;
import com.github.thomaselliott.simplebattlemap.model.exception.NoSessionException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "token", produces = "application/json")
@RequestMapping(value = "/token",
        produces = { "application/json" })
public interface TokenApi {
    @ApiOperation(value = "Get tokens",
        nickname = "getTokens")
    @RequestMapping(value = "",
        method = RequestMethod.GET)
    ResponseEntity<List<Token>> getTokens(
            @AuthenticationPrincipal PlayerDetails player
    ) throws NoSessionException;

    @ApiOperation(value = "Update token",
            nickname = "updateToken")
    @RequestMapping(value = "",
            method = RequestMethod.PUT)
    ResponseEntity<Boolean> updateToken(
            @RequestBody Token token,
            @AuthenticationPrincipal PlayerDetails player
    ) throws NoSessionException;

    @ApiOperation(value = "Add token",
            nickname = "addToken")
    @RequestMapping(value = "",
            method = RequestMethod.POST)
    ResponseEntity<Boolean> addToken(
            @RequestBody TokenRequest tokenRequest,
            @AuthenticationPrincipal PlayerDetails player
    ) throws NoSessionException;

    @ApiOperation(value = "Delete token",
            nickname = "deleteToken")
    @RequestMapping(value = "/{tokenId}",
            method = RequestMethod.DELETE)
    ResponseEntity<Boolean> deleteToken(
            @PathVariable Long tokenId,
            @AuthenticationPrincipal PlayerDetails player
    ) throws NoSessionException;
}

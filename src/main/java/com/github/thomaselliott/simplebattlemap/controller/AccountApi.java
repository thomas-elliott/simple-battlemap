package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Player;
import com.github.thomaselliott.simplebattlemap.model.exception.ApiException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.security.Principal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "account", produces = "application/json")
@RequestMapping(value = "/account",
                produces = { "application/json" })
public interface AccountApi {
    @ApiOperation(value = "Log in to application",
                  nickname = "login")
    @RequestMapping(value = "/login",
                    method = RequestMethod.POST)
    ResponseEntity<String> login();

    @ApiOperation(value = "Register a new user",
                  nickname = "register")
    @RequestMapping(value = "/register",
                    method = RequestMethod.POST)
    ResponseEntity<String> register();

    @ApiOperation(value = "Log out from application",
                  nickname = "logout")
    @RequestMapping(value = "/logout",
                    method = RequestMethod.POST)
    ResponseEntity<String> logout();

    @ApiOperation(value = "Get user details",
                  nickname = "user")
    @RequestMapping(value = "/user",
                    method = RequestMethod.GET)
    ResponseEntity<Player> user(Principal user) throws ApiException;
}

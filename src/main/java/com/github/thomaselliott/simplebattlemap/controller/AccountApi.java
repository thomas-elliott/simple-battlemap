package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Player;
import com.github.thomaselliott.simplebattlemap.model.RegistrationRequest;
import com.github.thomaselliott.simplebattlemap.model.exception.ApiException;
import com.github.thomaselliott.simplebattlemap.model.exception.RegistrationException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

    @ApiOperation(value = "Log out from application",
            nickname = "logout")
    @RequestMapping(value = "/logout",
            method = RequestMethod.POST)
    ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response);

    @ApiOperation(value = "Register a new user",
                  nickname = "register")
    @RequestMapping(value = "/register",
                    method = RequestMethod.POST)
    ResponseEntity<Player> register(@RequestBody RegistrationRequest request) throws RegistrationException;
}

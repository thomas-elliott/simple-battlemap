package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.LoginCredentials;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class UserController {
    @RequestMapping(value = "/user")
    @ResponseBody
    public Principal user(Principal user) {
        return user;
    }

    @CrossOrigin
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(@RequestBody LoginCredentials loginCredentials) {
        log.info("Login credentials: {}", loginCredentials);
    }
}

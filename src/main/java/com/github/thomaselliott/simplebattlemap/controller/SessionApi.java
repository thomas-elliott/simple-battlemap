package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.SessionInfo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "session", produces = "application/json")
@RequestMapping(value = "/session",
        produces = { "application/json" })
public interface SessionApi {
    @ApiOperation(value = "List sessions",
            nickname = "listSessions")
    @RequestMapping(value = "/all",
            method = RequestMethod.GET)
    List<SessionInfo> getSessionList();

    @ApiOperation(value = "Get current session",
            nickname = "getCurrentSession")
    @RequestMapping(value = "/",
            method = RequestMethod.GET)
    ResponseEntity<SessionInfo> getCurrentSession();

    @ApiOperation(value = "Get session",
            nickname = "getSession")
    @RequestMapping(value = "/{id}",
            method = RequestMethod.GET)
    ResponseEntity<Session> getSession(
            @ApiParam @PathVariable Long id);

    @ApiOperation(value = "Update session",
            nickname = "putSession")
    @RequestMapping(value = "/{id}",
            method = RequestMethod.PUT)
    ResponseEntity<Session> putSession(
            @ApiParam @PathVariable Long id,
            @RequestBody Session session);

    @ApiOperation(value = "Load session",
            nickname = "loadSession")
    @RequestMapping(value = "/{id}",
            method = RequestMethod.POST)
    ResponseEntity<SessionInfo> loadSession(
            @ApiParam @PathVariable Long id);

    @ApiOperation(value = "Create new session",
            nickname = "postSession")
    @RequestMapping(value = "/",
            method = RequestMethod.POST)
    ResponseEntity<SessionInfo> newSession();
}

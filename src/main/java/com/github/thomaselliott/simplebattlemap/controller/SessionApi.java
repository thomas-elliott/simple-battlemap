package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;
import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.SessionInfo;
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
    ResponseEntity<SessionInfo> getCurrentSession(
            @AuthenticationPrincipal PlayerDetails player);

    @ApiOperation(value = "Get session",
            nickname = "getSession")
    @RequestMapping(value = "/{sessionId}",
            method = RequestMethod.GET)
    ResponseEntity<Session> getSession(
            @ApiParam @PathVariable Long sessionId);

    @ApiOperation(value = "Update session",
            nickname = "putSession")
    @RequestMapping(value = "/{sessionId}",
            method = RequestMethod.PUT)
    ResponseEntity<Session> putSession(
            @ApiParam @PathVariable Long sessionId,
            @RequestBody Session session);

    @ApiOperation(value = "Join session",
            nickname = "joinSession")
    @RequestMapping(value = "/{sessionId}",
            method = RequestMethod.POST)
    ResponseEntity<SessionInfo> joinSession(
            @ApiParam @PathVariable Long sessionId,
            @AuthenticationPrincipal PlayerDetails player)
            throws NoSessionException;

    @ApiOperation(value = "Create new session",
            nickname = "postSession")
    @RequestMapping(value = "/",
            method = RequestMethod.POST)
    ResponseEntity<SessionInfo> newSession();
}

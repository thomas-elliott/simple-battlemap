package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.PlayerDetails;
import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.SessionInfo;
import com.github.thomaselliott.simplebattlemap.model.exception.NoSessionException;
import com.github.thomaselliott.simplebattlemap.service.SessionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class SessionController implements SessionApi {
    private SessionService sessionService;

    private SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @Override
    public List<SessionInfo> getSessionList() {
        return sessionService.getAllSessions()
                .stream()
                .map(SessionInfo::fromSession)
                .collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<SessionInfo> getCurrentSession(PlayerDetails player) {
        return ResponseEntity.ok(SessionInfo.fromSession(
                sessionService.getPlayerSession(player.getUsername())));
    }

    @Override
    public ResponseEntity<Session> getSession(Long sessionId) {
        return ResponseEntity.ok(sessionService.getSession(sessionId));
    }

    @Override
    public ResponseEntity<Session> putSession(Long sessionId, Session session) {
        return null;
    }

    @Override
    public ResponseEntity<SessionInfo> joinSession(Long sessionId, PlayerDetails player)
        throws NoSessionException {

        return ResponseEntity.ok(
                SessionInfo.fromSession(sessionService.joinSession(sessionId, player.getUsername())));
    }

    @Override
    public ResponseEntity<SessionInfo> newSession() {
        Session session = sessionService.newSession();
        return ResponseEntity.ok(SessionInfo.fromSession(session));
    }
}

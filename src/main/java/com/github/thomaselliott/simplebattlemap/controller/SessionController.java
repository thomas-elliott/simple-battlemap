package com.github.thomaselliott.simplebattlemap.controller;

import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.SessionInfo;
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
    public ResponseEntity<Session> getCurrentSession() {
        return ResponseEntity.ok(sessionService.getCurrentSession());
    }

    @Override
    public ResponseEntity<Session> getSession(Long id) {
        return ResponseEntity.ok(sessionService.getSession(id));
    }

    @Override
    public ResponseEntity<Session> putSession(Long id, Session session) {
        return null;
    }

    @Override
    public ResponseEntity<Session> newSession() {
        Session session = sessionService.newSession();
        return ResponseEntity.ok(session);
    }
}

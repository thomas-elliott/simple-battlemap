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

import lombok.extern.slf4j.Slf4j;

@Slf4j
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
        try {
            SessionInfo session = SessionInfo.fromSession(
                    sessionService.getPlayerSession(player.getUsername()));
            session.setPlayer(player);

            return ResponseEntity.ok(session);
        } catch (NoSessionException e) {
            log.info("Couldn't find session for player: {}", player.getUsername());
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Session> putSession(Long sessionId, Session session) {
        // TODO: Implement
        return null;
    }

    @Override
    public ResponseEntity<SessionInfo> joinSession(Long sessionId, PlayerDetails player)
        throws NoSessionException {
        SessionInfo session = SessionInfo.fromSession(
                sessionService.joinSession(sessionId, player.getUsername()));
        session.setPlayer(player);

        return ResponseEntity.ok(session);
    }

    @Override
    public ResponseEntity<SessionInfo> newSession() {
        // TODO: Checking player

        Session session = sessionService.newSession();
        return ResponseEntity.ok(SessionInfo.fromSession(session));
    }
}

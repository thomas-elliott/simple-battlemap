package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.exception.NoSessionException;
import com.github.thomaselliott.simplebattlemap.repository.SessionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SessionService {
    private SessionRepository sessionRepository;
    private SimpMessagingTemplate messagingTemplate;

    // Solely in-memory stores for session
    // TODO: Maybe abstract so it can be redis, database etc. for distributed/persistent
    private Map<Long, Session> currentSessions = new HashMap<>();
    private Map<String, Session> playerSessions = new HashMap<>();

    @Autowired
    public SessionService(SessionRepository sessionRepository,
                          SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.sessionRepository = sessionRepository;

        // Load all sessions
        long startTime = System.currentTimeMillis();
        List<Session> sessions = this.sessionRepository.findAll();
        sessions.forEach(s -> currentSessions.put(s.getId(), s));
        log.debug("Loaded sessions from database. {} sessions, took {}ms",
                sessions.size(), System.currentTimeMillis() - startTime);
    }

    public Session newSession() {
        long startTime = System.currentTimeMillis();

        Session newSession = sessionRepository.save(new Session());
        currentSessions.put(newSession.getId(), newSession);
        log.debug("Created new session in database, took {}ms",
                System.currentTimeMillis() - startTime);
        return newSession;
    }

    public Session joinSession(Long sessionId, String player) throws NoSessionException {
        Session session = getSession(sessionId);
        if (session == null) throw new NoSessionException("Attempted to join invalid session");

        log.debug("Adding player {} to session {}", player, sessionId);
        session.addPlayer(player);
        playerSessions.put(player, session);

        return session;
    }

    public boolean setMap(String player, BattleMap map) {
        Session session = getPlayerSession(player);
        if (session != null) {
            session.setMap(map);
            sendUpdates();
            return true;
        } else {
            return false;
        }
    }

    @Nullable
    public Session getSession(Long sessionId) {
        return currentSessions.get(sessionId);
    }

    @Nullable
    public Session getPlayerSession(String player) {
        log.debug("Retrieving session for player {}", player);
        return playerSessions.get(player);
    }

    public List<Session> getAllSessions() {
        return new ArrayList<>(currentSessions.values());
    }

    public void sendUpdates() {
        messagingTemplate.convertAndSend("/topic/maps", "Send manually");
    }

/*    public List<Token> getTokens(String player) throws NoSessionException {
        Session currentSession = getPlayerSession(player);
        if (currentSession == null) throw new NoSessionException("No session found");

        Map<Long, Token> tokens = currentSession.getTokens();

        return new ArrayList<>(tokens.values());
    }

    public void addToken(Token token) throws NoSessionException {
        if (currentSession == null) throw new NoSessionException("No session found");

        if (token.getId() != null && currentSession.containsToken(token)) {
            log.info("Duplicate token: ({}) {}", token.getId(), token.getName());
            return;
        }

        currentSession.addToken(token);
        messagingTemplate.convertAndSend("/topic/tokens", "Send after add");
    }

    public void moveToken(Long id, int x, int y) throws NoSessionException {
        if (currentSession == null) throw new NoSessionException("No session found");

        currentSession.moveToken(id, x, y);

        messagingTemplate.convertAndSend("/topic/tokens", "Send after move");
    }

    public void updateToken(Token token) throws NoSessionException {
        if (currentSession == null) throw new NoSessionException("No session found");

        if (!currentSession.containsToken(token)) {
            log.info("Could not find token to update: ({}) {}", token.getId(), token.getName());
            return;
        }

        currentSession.updateToken(token);
    }

    public void removeToken(Long id) throws NoSessionException {
        if (currentSession == null) throw new NoSessionException("No session found");

        currentSession.removeToken(id);

        messagingTemplate.convertAndSend("/topic/tokens", "Send after remove");
    }*/
}

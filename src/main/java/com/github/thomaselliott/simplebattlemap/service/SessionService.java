package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.model.exception.NoSessionException;
import com.github.thomaselliott.simplebattlemap.repository.SessionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private Map<Long, Token> currentTokens = new HashMap<>();

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

    public void setMap(String player, BattleMap map) throws NoSessionException {
        Session session = getPlayerSession(player);

        session.setMap(map);
        sendUpdates();
    }

    @Nullable
    public Session getSession(Long sessionId) {
        return currentSessions.get(sessionId);
    }

    @NonNull
    public Session getPlayerSession(String player) throws NoSessionException {
        log.debug("Retrieving session for player {}", player);
        Session currentSession = playerSessions.get(player);
        if (currentSession == null) throw new NoSessionException("No session found");
        return currentSession;
    }

    public List<Session> getAllSessions() {
        return new ArrayList<>(currentSessions.values());
    }

    public void sendUpdates() {
        messagingTemplate.convertAndSend("/topic/maps", "Send manually");
    }

    public List<Token> getTokens(String player) throws NoSessionException {
        Session currentSession = getPlayerSession(player);

        Map<Long, Token> tokens = currentSession.getTokens();

        return new ArrayList<>(tokens.values());
    }

    public void addToken(Token token, String player) throws NoSessionException {
        Session currentSession = getPlayerSession(player);

        if (token.getId() != null && currentSession.containsToken(token)) {
            log.info("Duplicate token: ({}) {}", token.getId(), token.getName());
            return;
        }

        if (token.getId() == null) {
            token.setId(Token.createID());
        }

        currentTokens.put(token.getId(), token);
        currentSession.addToken(token);
        messagingTemplate.convertAndSend("/topic/tokens", "Send after add");
    }

    public Token getToken(Long id) {
        Token token = currentTokens.get(id);
        if (token == null) {
            token = new Token();
        }
        return token;
    }

    public void moveToken(Long id, int x, int y, String player) throws NoSessionException {
        Session currentSession = getPlayerSession(player);

        currentSession.moveToken(id, x, y);

        messagingTemplate.convertAndSend("/topic/tokens", "Send after move");
    }

    public void updateToken(Token token, String player) throws NoSessionException {
        Session currentSession = getPlayerSession(player);

        if (!currentSession.containsToken(token)) {
            log.info("Could not find token to update: ({}) {}", token.getId(), token.getName());
            return;
        }

        currentSession.updateToken(token);
    }

    public void removeToken(Long id, String player) throws NoSessionException {
        Session currentSession = getPlayerSession(player);

        currentSession.removeToken(id);
        currentTokens.remove(id);

        messagingTemplate.convertAndSend("/topic/tokens", "Send after remove");
    }

    public BattleMap getMap(String username) throws NoSessionException {
        Session session = getPlayerSession(username);
        return session.getMap();
    }
}

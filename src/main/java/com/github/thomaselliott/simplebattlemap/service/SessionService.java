package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Session;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.model.exception.NoSessionException;
import com.github.thomaselliott.simplebattlemap.repository.SessionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SessionService {
    private SessionRepository sessionRepository;
    private SimpMessagingTemplate messagingTemplate;

    private Session currentSession;

    @Autowired
    public SessionService(SessionRepository sessionRepository,
                          SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.sessionRepository = sessionRepository;
    }

    public Session newSession() {
        this.currentSession = new Session();
        sessionRepository.save(this.currentSession);
        return this.currentSession;
    }

    public Session loadSession(Long sessionId) {
        this.currentSession = sessionRepository.findById(sessionId).orElse(null);
        return this.currentSession;
    }

    public Session getSession(Long sessionId) {
        return sessionRepository.findById(sessionId).orElse(null);
    }

    public void saveSession() throws NoSessionException {
        if (currentSession == null) throw new NoSessionException("No session found");

        sessionRepository.save(currentSession);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session getCurrentSession() {
        return currentSession;
    }

    public List<Token> getTokens() throws NoSessionException {
        if (currentSession == null) throw new NoSessionException("No session found");

        Map<Long, Token> tokens = currentSession.getTokens();

        return new ArrayList<>(tokens.values());
    }

    public void sendUpdates() {
        messagingTemplate.convertAndSend("/topic/tokens", "Send manually");
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
    }
}

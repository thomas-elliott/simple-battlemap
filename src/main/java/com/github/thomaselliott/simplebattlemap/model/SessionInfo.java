package com.github.thomaselliott.simplebattlemap.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SessionInfo {
    private Long sessionId;
    private PlayerDetails player;
    private Long mapId;

    public SessionInfo(Long sessionId, Long mapId) {
        this.sessionId = sessionId;
        this.mapId = mapId;
    }

    public static SessionInfo fromSession(Session session) {
        if (session == null) return new SessionInfo();
        return new SessionInfo(
                session.getId(),
                session.getMap() == null ? null : session.getMap().getId());
    }
}

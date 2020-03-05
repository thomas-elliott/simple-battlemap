package com.github.thomaselliott.simplebattlemap.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionInfo {
    private Long sessionId;
    private Boolean mapLoaded;
    private Long mapId;

    public static SessionInfo fromSession(Session session) {
        if (session == null) return new SessionInfo();
        return new SessionInfo(session.getId(),
            session.getMap() != null,
                session.getMap() == null ? null : session.getMap().getId());
    }
}

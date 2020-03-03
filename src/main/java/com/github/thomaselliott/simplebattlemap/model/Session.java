package com.github.thomaselliott.simplebattlemap.model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import lombok.Data;

@Data
@Entity
public class Session {
    @Id
    @GeneratedValue
    @Column(name = "session_id")
    private Long id;
    @OneToOne
    private BattleMap map;
    @Transient
    private Map<Long, Token> tokens;

    public Session() {
        tokens = new HashMap<>();
    }

    public void addToken(Token token) {
        if (tokens == null) { tokens = new HashMap<>(); }
        tokens.put(token.getId(), token);
    }

    public void updateToken(Token token) {
        tokens.put(token.getId(), token);
    }

    public void removeToken(Long id) {
        if (id != null) {
            tokens.remove(id);
        }
    }

    public void moveToken(Long id, int x, int y) {
        Token token = tokens.get(id);
        token.setX(x);
        token.setY(y);
    }

    public boolean containsToken(Token token) {
        return tokens.containsKey(token.getId());
    }

}

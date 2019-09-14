package com.github.thomaselliott.simplebattlemap.model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class BattleMap {
    @Id
    @GeneratedValue
    @Column(name = "map_id")
    private Long id;
    private int gridHeight;
    private int gridWidth;
    @OneToMany
    private Map<Long, Token> tokens;
    @OneToOne
    @JoinColumn(name = "background_image",
            referencedColumnName = "asset_id",
            foreignKey = @ForeignKey(name = "fk_background_image"))
    private Asset backgroundImage;

    public BattleMap() {
        tokens = new HashMap<>();
    }

    public BattleMap(Asset backgroundImage, int gridWidth, int gridHeight) {
        tokens = new HashMap<>();
        this.backgroundImage = backgroundImage;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }

    public void addToken(Token token) {
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

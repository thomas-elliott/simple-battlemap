package com.github.thomaselliott.simplebattlemap.model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
    private int gridLineWidth;
    private String name;
    @OneToOne
    @JoinColumn(name = "background_image",
            referencedColumnName = "asset_id",
            foreignKey = @ForeignKey(name = "fk_background_image"))
    private Asset backgroundImage;

    public BattleMap() {}

    public BattleMap(Asset backgroundImage, int gridWidth, int gridHeight) {
        this.backgroundImage = backgroundImage;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }
}

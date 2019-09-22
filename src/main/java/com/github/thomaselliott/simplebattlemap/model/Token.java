package com.github.thomaselliott.simplebattlemap.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.github.thomaselliott.simplebattlemap.json.TokenDeserialiser;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
@JsonDeserialize(using = TokenDeserialiser.class)
public class Token {
    @Id
    @GeneratedValue
    @Column(name = "token_id")
    private Long id;
    private String name;
    @ManyToOne
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @JoinColumn(name = "player",
            referencedColumnName = "player_id",
            foreignKey = @ForeignKey(name = "fk_player"))
    private Player player;
    @OneToOne
    @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @JoinColumn(name = "asset",
            referencedColumnName = "asset_id",
            foreignKey = @ForeignKey(name = "fk_asset"))
    private Asset imageAsset;
    private int x;
    private int y;

    public Token() {}
    public Token(Long id) {
        this.id = id;
    }

    public Long getAssetId() {
        if (imageAsset == null) return null;
        return imageAsset.getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Token token = (Token) o;
        return id.equals(token.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

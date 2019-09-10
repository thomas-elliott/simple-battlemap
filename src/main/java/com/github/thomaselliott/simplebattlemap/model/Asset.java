package com.github.thomaselliott.simplebattlemap.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class Asset {
    @Id
    @GeneratedValue
    @Column(name = "asset_id")
    private Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private AssetType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image",
                referencedColumnName = "image_id",
                foreignKey = @ForeignKey(name = "fk_image"))
    private ImageFile image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail",
                referencedColumnName = "image_id",
                foreignKey = @ForeignKey(name = "fk_thumbnail"))
    private ImageFile thumbnail;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Asset asset = (Asset) o;
        return id.equals(asset.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

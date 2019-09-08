package com.github.thomaselliott.simplebattlemap.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class Asset {
    @Id
    @GeneratedValue(generator = "uuid")
    private Long id;
    private String name;
    private AssetType type;
    @ManyToOne
    private Image image;
    @ManyToOne
    private Thumbnail thumbnail;
}

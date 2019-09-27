package com.github.thomaselliott.simplebattlemap.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BattleMapUpdateRequest {
    private Long id;
    private String name;
    private int gridHeight;
    private int gridWidth;
    private int gridLineWidth;
}

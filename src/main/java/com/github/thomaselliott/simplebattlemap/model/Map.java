package com.github.thomaselliott.simplebattlemap.model;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Map {
    private Grid grid;
    private List<Token> tokens;
    private String backgroundImagePath;
}

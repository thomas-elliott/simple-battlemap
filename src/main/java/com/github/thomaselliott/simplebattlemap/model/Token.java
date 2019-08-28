package com.github.thomaselliott.simplebattlemap.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Token {
    private long id;
    private long playerId;
    private String tokenImage;
    private int x;
    private int y;
}

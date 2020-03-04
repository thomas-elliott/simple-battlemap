package com.github.thomaselliott.simplebattlemap.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class Player {
    @Id
    @GeneratedValue
    @Column(name = "player_id")
    private Long id;
    private String name;
    private String username;
    private boolean dm;
    @OneToOne
    private Session session;
}

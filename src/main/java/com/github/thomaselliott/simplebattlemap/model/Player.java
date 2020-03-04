package com.github.thomaselliott.simplebattlemap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private String email;
    private String username;
    @JsonIgnore
    private String password;
    private boolean dm;
    @OneToOne
    private Session session;
}

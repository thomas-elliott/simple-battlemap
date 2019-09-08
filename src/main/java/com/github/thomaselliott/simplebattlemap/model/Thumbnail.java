package com.github.thomaselliott.simplebattlemap.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class Thumbnail {
    @Id
    @GeneratedValue(generator = "uuid")
    private Long id;
    @Lob
    private byte[] data;
}

package com.github.thomaselliott.simplebattlemap.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class Image {
    @Id
    @GeneratedValue(generator = "uuid")
    private Long id;
    private String fileName;
    private String contentType;
    @Lob
    private byte[] data;
}

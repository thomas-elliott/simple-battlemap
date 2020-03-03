package com.github.thomaselliott.simplebattlemap.model;

import com.fasterxml.jackson.annotation.JsonValue;

import org.hibernate.annotations.Type;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Data;

@Data
@Entity
public class ImageFile {
    @Id
    @GeneratedValue
    @Column(name = "image_id")
    private Long id;
    private String fileName;
    private String extension;
    private String contentType;
    private Integer width;
    private Integer height;
    private byte[] data;

    @Lob
    @Type(type = "org.hibernate.type.ImageType")
    public void setData(byte[] data) {
        this.data = data;
    }

    @JsonValue
    public byte[] getData() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ImageFile image = (ImageFile) o;
        return id.equals(image.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

package com.github.thomaselliott.simplebattlemap.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.util.StringUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum AssetType {
    TOKEN ("token"),
    BACKGROUND ("background");

    private String description;

    public static AssetType fromString(String description) {
        if (StringUtils.isEmpty(description)) return null;

        for (AssetType type : AssetType.values()) {
            if (type.description.equalsIgnoreCase(description)) {
                return type;
            }
        }

        return null;
    }

}

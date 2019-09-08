package com.github.thomaselliott.simplebattlemap.model;

import org.springframework.util.StringUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AssetType {
    TOKEN ("token"),
    BACKGROUND ("background");

    private String description;

    public static AssetType fromString(String description) {
        if (StringUtils.isEmpty(description)) throw new IllegalArgumentException("Empty asset type");

        for (AssetType type : AssetType.values()) {
            if (type.description.equalsIgnoreCase(description)) {
                return type;
            }
        }

        throw new IllegalArgumentException("Invalid asset type");
    }
}

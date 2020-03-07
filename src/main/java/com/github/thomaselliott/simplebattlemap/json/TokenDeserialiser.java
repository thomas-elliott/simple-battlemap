package com.github.thomaselliott.simplebattlemap.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.github.thomaselliott.simplebattlemap.model.Token;
import com.github.thomaselliott.simplebattlemap.repository.AssetRepository;
import com.github.thomaselliott.simplebattlemap.repository.PlayerRepository;
import com.github.thomaselliott.simplebattlemap.repository.TokenRepository;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

public class TokenDeserialiser extends StdDeserializer<Token> {
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private AssetRepository assetRepository;

    public TokenDeserialiser() {
        this(null);
    }

    public TokenDeserialiser(Class<?> vc) {
        super(vc);
    }

    @Override
    public Token deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        Token token = new Token();

        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        // Go up the tree if token is defined
        if (node.has("token")) {
            node = node.get("token");
        }

        if (node.has("id")) {
            Long id = node.get("id").asLong();
            token = tokenRepository.findById(id).orElse(new Token(id));
        }

        if (node.has("name")) {
            token.setName(node.get("name").asText());
        }

        if (node.has("x")) {
            token.setX(node.get("x").asInt());
        }

        if (node.has("y")) {
            token.setY(node.get("y").asInt());
        }

        if (node.has("imageAsset")) {
            Long id = node.get("imageAsset").asLong();
            token.setImageAsset(assetRepository.findById(id).orElse(null));
        }

        return token;
    }
}

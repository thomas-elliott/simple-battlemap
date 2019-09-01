package com.github.thomaselliott.simplebattlemap.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MessageController {
    @MessageMapping("/queue/updates")
    @SendTo("/topic/tokens")
    public String receiveClientUpdate() {
        log.info("Retrieved data from user");
        return "Got from user";
    }

    @SendTo("/topic/tokens")
    public String sendToClients() {
        log.info("Sending data to topic");
        return "Send data to client";
    }
}

package com.github.thomaselliott.simplebattlemap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SimpleBattlemapApplication {

    public static void main(String[] args) {
        SpringApplication.run(SimpleBattlemapApplication.class, args);
    }

}

package com.github.thomaselliott.simplebattlemap.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ApiException extends Exception {
    public ApiException(String message) {
        super(message);
    }
}

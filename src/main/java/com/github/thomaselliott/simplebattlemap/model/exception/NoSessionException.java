package com.github.thomaselliott.simplebattlemap.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class NoSessionException extends ApiException {
    public NoSessionException(String message) {
        super(message);
    }
}

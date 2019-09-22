package com.github.thomaselliott.simplebattlemap.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RestAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpRequest, HttpServletResponse httpResponse, Authentication authentication) throws IOException, ServletException {
        httpResponse.setStatus(HttpStatus.OK.value());
        //httpResponse.addHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        httpResponse.addHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        httpResponse.addHeader("Access-Control-Allow-Headers", "Content-Type");
        httpResponse.getWriter().write("{\"authenticated\": \"ok\"}");
        httpResponse.getWriter().flush();
        httpResponse.getWriter().close();
        log.info("Http auth success");
    }
}

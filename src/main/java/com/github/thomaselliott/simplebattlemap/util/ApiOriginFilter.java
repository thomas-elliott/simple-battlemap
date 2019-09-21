package com.github.thomaselliott.simplebattlemap.util;

import org.springframework.stereotype.Component;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ApiOriginFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        long startTime = System.currentTimeMillis();
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        if (!httpResponse.containsHeader("Access-Control-Allow-Origin")) {
            httpResponse.addHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        }
        if (!httpResponse.containsHeader("Access-Control-Allow-Credentials")) {
            httpResponse.addHeader("Access-Control-Allow-Credentials", "true");
        }
        httpResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        httpResponse.addHeader("Access-Control-Allow-Headers", "Content-Type, REMOTE_USER, x-authenticated-scope");

        String requestMethod = httpRequest.getMethod();
        String requestPath = httpRequest.getRequestURI();

        chain.doFilter(request, response);
        int responseCode = httpResponse.getStatus();

        String logString = String.format("Request=%s %s|Response=%d|Duration=%dms", requestMethod, requestPath, responseCode, System.currentTimeMillis() - startTime);

        if (requestPath.contains("actuator")) {
            log.info(logString);
        } else {
            log.info(logString);
        }
    }

    @Override
    public void destroy() {
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }
}

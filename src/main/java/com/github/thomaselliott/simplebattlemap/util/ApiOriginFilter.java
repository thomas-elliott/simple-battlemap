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

        httpResponse.addHeader("Access-Control-Allow-Origin", "*");

        String requestMethod = httpRequest.getMethod();
        String requestPath = httpRequest.getRequestURI();

        chain.doFilter(request, response);
        int responseCode = httpResponse.getStatus();

        String logString = String.format("Request=%s %s|Response=%d|Duration=%dms", requestMethod, requestPath, responseCode, System.currentTimeMillis() - startTime);

        if (requestPath.contains("actuator")) {
            log.debug(logString);
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

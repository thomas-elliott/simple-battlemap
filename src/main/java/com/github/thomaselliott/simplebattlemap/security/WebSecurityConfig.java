package com.github.thomaselliott.simplebattlemap.security;

import com.github.thomaselliott.simplebattlemap.util.ApiOriginFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO: Actual security
        http.csrf().disable()
                .addFilterBefore(new ApiOriginFilter(), BasicAuthenticationFilter.class)
            .authorizeRequests()
                .antMatchers("/account/*").permitAll()
                .antMatchers("/actuator/*").permitAll()
                .antMatchers("/ws/**").permitAll() // TODO: Authenticate WS
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/webjars/**").permitAll()
                .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/v2/api-docs/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .successHandler(customAuthenticationSuccessHandler())
                .failureHandler(customAuthenticationFailureHandler())
                .permitAll()
                .and()
            .httpBasic()
            .and()
                .exceptionHandling().authenticationEntryPoint((request, response, authException) -> {
                    if (request.getMethod().equals("OPTIONS")) {
                        // Always return 200 on OPTIONS TODO: Probably not the best way to do it
                        response.setStatus(HttpServletResponse.SC_OK);
                    } else if (authException != null) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().print(authException.getLocalizedMessage());
                    }
                });
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccessHandler customAuthenticationSuccessHandler() {
        return new RestAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler customAuthenticationFailureHandler() {
        return new RestAuthenticationFailureHandler();
    }
}

package com.github.thomaselliott.simplebattlemap.util;

import com.github.thomaselliott.simplebattlemap.model.Asset;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

@Component
public class CustomRepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Asset.class);
    }
}

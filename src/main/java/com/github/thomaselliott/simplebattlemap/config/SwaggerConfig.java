package com.github.thomaselliott.simplebattlemap.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;

import javax.servlet.ServletContext;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.RelativePathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Value("${springfox.documentation.swagger.v2.basePath}")
    private String basePath;

    private ServletContext servletContext;

    @Autowired
    public SwaggerConfig(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.github.thomaselliott.simplebattlemap"))
                .paths(PathSelectors.any())
                .build().apiInfo(apiInfo())
                .pathProvider(new RelativePathProvider(servletContext) {
                    @Override
                    public String getApplicationBasePath() {
                        return basePath;
                    }
                });
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "Simple Battlemap v1",
                "TBD",
                "0.01",
                "Terms of service",
                new Contact("", "", ""),
                "License of API", "API license URL", Collections.emptyList());
    }
}

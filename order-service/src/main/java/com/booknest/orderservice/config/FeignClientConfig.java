package com.booknest.orderservice.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.util.StringUtils;

@Configuration
public class FeignClientConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            if (RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes attributes) {
                String authorizationHeader = attributes.getRequest().getHeader("Authorization");
                if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
                    // Forward the existing token
                    requestTemplate.header("Authorization", authorizationHeader);
                }
            }
        };
    }
}

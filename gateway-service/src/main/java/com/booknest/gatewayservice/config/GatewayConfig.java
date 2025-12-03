package com.booknest.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r.path("/api/users/**").uri("lb://user-service"))
            .route("auth-service", r -> r.path("/api/auth/**").uri("lb://user-service"))
            .route("product-service", r -> r.path("/api/products/**").uri("lb://product-service"))
            .route("product-service-categories", r -> r.path("/api/categories/**").uri("lb://product-service"))
            .route("order-service", r -> r.path("/api/orders/**").uri("lb://order-service"))
            .route("payment-service", r -> r.path("/api/payments/**").uri("lb://payment-service"))
            .route("notification-service", r -> r.path("/api/notifications/**").uri("lb://notification-service"))
            .build();
    }
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000"); // địa chỉ frontend
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}
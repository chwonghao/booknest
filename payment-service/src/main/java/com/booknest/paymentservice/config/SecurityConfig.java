package com.booknest.paymentservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain paymentSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/payments/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/payments/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/payments/**").permitAll()
                .requestMatchers(HttpMethod.PATCH, "/api/payments/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/payments/**").permitAll()
                .anyRequest().permitAll()
            );
        return http.build();
    }
}

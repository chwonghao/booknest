package com.booknest.userservice.infrastructure.config;

import com.booknest.userservice.domain.service.PasswordHasher;
import com.booknest.userservice.domain.service.UserDomainService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DomainServiceConfig {

    @Bean
    public UserDomainService userDomainService(PasswordHasher passwordHasher) {
        return new UserDomainService(passwordHasher);
    }
}

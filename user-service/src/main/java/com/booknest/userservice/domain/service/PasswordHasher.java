package com.booknest.userservice.domain.service;

public interface PasswordHasher {
    String hash(String rawPassword);
}

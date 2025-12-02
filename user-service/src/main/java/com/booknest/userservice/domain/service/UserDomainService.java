package com.booknest.userservice.domain.service;

import com.booknest.userservice.application.dto.UserPatchCommand;
import com.booknest.userservice.domain.model.User;
import com.booknest.userservice.domain.event.UserCreatedEvent;

import java.time.LocalDateTime;

public class UserDomainService {

    private final PasswordHasher passwordHasher;

    public UserDomainService(PasswordHasher passwordHasher) {
        this.passwordHasher = passwordHasher;
    }

    public void validateNewUser(User user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
    }

    public void initializeUser(User user) {
        user.setPassword(passwordHasher.hash(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
    }

    public void updateTimestamps(User user) {
        user.setUpdatedAt(LocalDateTime.now());
    }

    public UserCreatedEvent publishUserCreatedEvent(User user) {
        return new UserCreatedEvent(user.getId(), user.getFullName());
    }

    public void applyPatch(User existing, UserPatchCommand command) {
        if (command.getFullName() != null)
            existing.setFullName(command.getFullName());
        if (command.getEmail() != null)
            existing.changeEmail(command.getEmail());
        if (command.getPhoneNumber() != null)
            existing.setPhoneNumber(command.getPhoneNumber());
        if (command.getAddress() != null)
            existing.setAddress(command.getAddress());
        if (command.getGender() != null)
            existing.setGender(command.getGender());
        if (command.getAvatarUrl() != null)
            existing.setAvatarUrl(command.getAvatarUrl());
        if (command.getRole() != null)
            existing.changeRole(command.getRole());
        if (command.getStatus() != null) {
            switch (command.getStatus()) {
                case ACTIVE -> existing.activate();
                case INACTIVE -> existing.deactivate();
                case BANNED -> existing.ban();
            }
        }
        existing.setUpdatedAt(LocalDateTime.now());
    }

    public void updateUserDetails(User existing, User userDetails) {
        if (userDetails.getFullName() != null) {
            existing.setFullName(userDetails.getFullName());
        }
        if (userDetails.getEmail() != null) {
            existing.changeEmail(userDetails.getEmail());
        }
        if (userDetails.getPhoneNumber() != null) {
            existing.setPhoneNumber(userDetails.getPhoneNumber());
        }
        if (userDetails.getAddress() != null) {
            existing.setAddress(userDetails.getAddress());
        }
        if (userDetails.getGender() != null) {
            existing.setGender(userDetails.getGender());
        }
        if (userDetails.getAvatarUrl() != null) {
            existing.setAvatarUrl(userDetails.getAvatarUrl());
        }
        if (userDetails.getRole() != null) {
            existing.changeRole(userDetails.getRole());
        }
        if (userDetails.getStatus() != null) {
            switch (userDetails.getStatus()) {
                case ACTIVE -> existing.activate();
                case INACTIVE -> existing.deactivate();
                case BANNED -> existing.ban();
            }
        }
        existing.setUpdatedAt(LocalDateTime.now());
    }
}

package com.booknest.userservice.service;

import com.booknest.commonlib.dto.NotificationDto;
import com.booknest.userservice.client.NotificationClient;
import com.booknest.userservice.model.Role;
import com.booknest.userservice.model.Status;
import com.booknest.userservice.model.User;
import com.booknest.userservice.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;
    private final NotificationClient notificationClient;

    public UserService(UserRepository repository, NotificationClient notificationClient) {
        this.repository = repository;
        this.notificationClient = notificationClient;
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return repository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public User createUser(User user) {
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User saved = repository.save(user);

        // 🔔 Gửi thông báo sang NotificationService
        NotificationDto notification = new NotificationDto();
        notification.setUserId(saved.getId());
        notification.setMessage("Welcome " + saved.getFullName() + "!");
        notification.setType("EMAIL");
        notification.setStatus("PENDING");
        notificationClient.createNotification(notification);

        return saved;
    }

    public Optional<User> updateUser(Long id, User details) {
        return repository.findById(id).map(user -> {
            user.setFullName(details.getFullName());
            user.setEmail(details.getEmail());
            user.setPhoneNumber(details.getPhoneNumber());
            user.setAddress(details.getAddress());
            user.setGender(details.getGender());
            user.setAvatarUrl(details.getAvatarUrl());
            user.setRole(details.getRole());
            user.setStatus(details.getStatus());
            user.setUpdatedAt(LocalDateTime.now());
            return repository.save(user);
        });
    }

    public Optional<User> patchUser(Long id, Map<String, Object> updates) {
        return repository.findById(id).map(user -> {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "fullName" -> user.setFullName((String) value);
                    case "email" -> user.setEmail((String) value);
                    case "phoneNumber" -> user.setPhoneNumber((String) value);
                    case "address" -> user.setAddress((String) value);
                    case "gender" -> user.setGender((String) value);
                    case "avatarUrl" -> user.setAvatarUrl((String) value);
                    case "role" -> user.setRole(Role.valueOf(value.toString()));
                    case "status" -> user.setStatus(Status.valueOf(value.toString()));
                }
            });
            user.setUpdatedAt(LocalDateTime.now());
            return repository.save(user);
        });
    }

    public boolean deleteUser(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}


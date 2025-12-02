package com.booknest.userservice.infrastructure.persistence;

import com.booknest.userservice.domain.model.User;

public class UserMapper {

    public static UserEntity toEntity(User domain) {
        UserEntity entity = new UserEntity();
        entity.setId(domain.getId());
        entity.setFullName(domain.getFullName());
        entity.setEmail(domain.getEmail());
        entity.setPassword(domain.getPassword());
        entity.setPhoneNumber(domain.getPhoneNumber());
        entity.setAddress(domain.getAddress());
        entity.setGender(domain.getGender());
        entity.setAvatarUrl(domain.getAvatarUrl());
        entity.setRole(domain.getRole());
        entity.setStatus(domain.getStatus());
        entity.setCreatedAt(domain.getCreatedAt());
        entity.setUpdatedAt(domain.getUpdatedAt());
        entity.setLastLogin(domain.getLastLogin());
        return entity;
    }

    public static User toDomain(UserEntity entity) {
        User domain = new User(entity.getFullName(), entity.getEmail(), entity.getPassword());
        domain.setId(entity.getId());
        // Ghi đè lại các giá trị từ DB
        domain.changeRole(entity.getRole());
        if (entity.getStatus() != null) {
            switch (entity.getStatus()) {
                case ACTIVE -> domain.activate();
                case INACTIVE -> domain.deactivate();
                case BANNED -> domain.ban();
            }
        }
        domain.setCreatedAt(entity.getCreatedAt());
        domain.setUpdatedAt(entity.getUpdatedAt());
        domain.setPassword(entity.getPassword()); // giữ nguyên password từ DB
        domain.setPhoneNumber(entity.getPhoneNumber());
        domain.setAddress(entity.getAddress());
        domain.setGender(entity.getGender());
        domain.setAvatarUrl(entity.getAvatarUrl());
        domain.setLastLogin(entity.getLastLogin()); // lấy từ DB, không override bằng loginSuccess()

        return domain;
    }
}

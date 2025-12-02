package com.booknest.userservice.domain.model;

public enum Role {
    USER("Người dùng thông thường"),
    ADMIN("Quản trị hệ thống"),
    SELLER("Người bán hàng");

    private final String description;

    Role(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}

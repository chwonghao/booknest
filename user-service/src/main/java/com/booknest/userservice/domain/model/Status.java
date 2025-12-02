package com.booknest.userservice.domain.model;

public enum Status {
    ACTIVE("Người dùng đang hoạt động"),
    INACTIVE("Người dùng chưa kích hoạt hoặc tạm ngưng"),
    BANNED("Người dùng bị cấm");

    private final String description;

    Status(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
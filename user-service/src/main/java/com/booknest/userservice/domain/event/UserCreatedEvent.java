package com.booknest.userservice.domain.event;

public class UserCreatedEvent {
    private final Long userId;
    private final String fullName;

    public UserCreatedEvent(Long userId, String fullName) {
        this.userId = userId;
        this.fullName = fullName;
    }

    public Long getUserId() { return userId; }
    public String getFullName() { return fullName; }
}

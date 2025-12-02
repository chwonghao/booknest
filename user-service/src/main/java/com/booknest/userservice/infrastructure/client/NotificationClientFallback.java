package com.booknest.userservice.infrastructure.client;

import com.booknest.commonlib.dto.NotificationDto;
import org.springframework.stereotype.Component;

@Component
public class NotificationClientFallback implements NotificationClient {

    @Override
    public NotificationDto createNotification(NotificationDto dto) {
        // Trả về DTO mặc định khi notification-service không phản hồi
        NotificationDto fallback = new NotificationDto();
        fallback.setUserId(dto.getUserId());
        fallback.setMessage("Notification service unavailable. Original message: " + dto.getMessage());
        fallback.setType(dto.getType());
        fallback.setStatus("FAILED");
        return fallback;
    }
}

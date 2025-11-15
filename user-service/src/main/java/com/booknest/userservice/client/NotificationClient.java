package com.booknest.userservice.client;

import com.booknest.commonlib.dto.NotificationDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service")
public interface NotificationClient {
    @PostMapping("/api/notifications")
    NotificationDto createNotification(@RequestBody NotificationDto dto);
}
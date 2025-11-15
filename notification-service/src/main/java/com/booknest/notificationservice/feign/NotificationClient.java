package com.booknest.notificationservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;

import com.booknest.commonlib.dto.NotificationDto;

import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "notification-service")
public interface NotificationClient {
    @PostMapping("/api/notifications")
    NotificationDto createNotification(@RequestBody NotificationDto dto);
}

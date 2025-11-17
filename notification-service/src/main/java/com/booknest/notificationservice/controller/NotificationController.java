package com.booknest.notificationservice.controller;

import com.booknest.notificationservice.model.Notification;
import com.booknest.notificationservice.model.NotificationStatus;
import com.booknest.notificationservice.service.NotificationService;
import com.booknest.notificationservice.service.NotificationSenderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationSenderService notificationSenderService;

    public NotificationController(NotificationService notificationService,
                                  NotificationSenderService notificationSenderService) {
        this.notificationService = notificationService;
        this.notificationSenderService = notificationSenderService;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUser(@PathVariable Long userId) {
        return notificationService.getNotificationsByUser(userId);
    }

    @GetMapping("/status/{status}")
    public List<Notification> getNotificationsByStatus(@PathVariable NotificationStatus status) {
        return notificationService.getNotificationsByStatus(status);
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable Long id,
                                                           @RequestBody Notification details) {
        return notificationService.updateNotification(id, details)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        return notificationService.deleteNotification(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/send-email")
    public ResponseEntity<Notification> sendEmailNotification(@RequestBody Notification notification) {

        Notification saved = notificationSenderService.sendNotification(notification);
        return ResponseEntity.ok(saved);
    }
}

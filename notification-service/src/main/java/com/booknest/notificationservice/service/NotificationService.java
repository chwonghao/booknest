package com.booknest.notificationservice.service;

import com.booknest.notificationservice.model.Notification;
import com.booknest.notificationservice.model.NotificationStatus;
import com.booknest.notificationservice.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    public Optional<Notification> getNotificationById(Long id) {
        return repository.findById(id);
    }

    public Notification createNotification(Notification notification) {
        return repository.save(notification);
    }

    public Optional<Notification> updateNotification(Long id, Notification details) {
        return repository.findById(id).map(existing -> {
            existing.setMessage(details.getMessage());
            existing.setType(details.getType());
            existing.setStatus(details.getStatus());
            return repository.save(existing);
        });
    }

    public boolean deleteNotification(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Notification> getNotificationsByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public List<Notification> getNotificationsByStatus(NotificationStatus status) {
        return repository.findByStatus(status);
    }
}

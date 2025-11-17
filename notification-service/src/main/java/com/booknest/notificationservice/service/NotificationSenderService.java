package com.booknest.notificationservice.service;

import com.booknest.commonlib.dto.UserDto;
import com.booknest.notificationservice.feign.UserClient;
import com.booknest.notificationservice.model.Notification;
import com.booknest.notificationservice.model.NotificationStatus;
import com.booknest.notificationservice.model.NotificationType;

import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class NotificationSenderService {

    private final NotificationService notificationService;
    private final EmailService emailService;
    private final UserClient userClient;

    public NotificationSenderService(NotificationService notificationService, EmailService emailService, UserClient userClient) {
        this.notificationService = notificationService;
        this.emailService = emailService;
        this.userClient = userClient;
    }
    private boolean isValidEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email != null && Pattern.matches(regex, email);
    }

    public Notification sendNotification(Notification notification) {
        // Lưu notification trước
        notification.setStatus(NotificationStatus.PENDING);
        Notification saved = notificationService.createNotification(notification);

        // Nếu là email thì gửi
        if (notification.getType() == NotificationType.EMAIL) {
            try {
                UserDto user = userClient.getUserById(notification.getUserId());
                String userEmail = user.getEmail();
                if (!isValidEmail(userEmail)) {
                    saved.setStatus(NotificationStatus.FAILED);
                    notificationService.updateNotification(saved.getId(), saved);
                    return saved;
                }
                String html = "<h3>Thông báo đơn hàng</h3>"
                        + "<p>" + notification.getMessage() + "</p>"
                        + "<p><b>Cảm ơn bạn đã mua sắm tại BookNest!</b></p>";

                emailService.sendHtmlEmail(userEmail, "Order Update", html);
                saved.setStatus(NotificationStatus.SENT);
            } catch (Exception e) {
                saved.setStatus(NotificationStatus.FAILED);
            }
            notificationService.updateNotification(saved.getId(), saved);
        }

        return saved;
    }
}

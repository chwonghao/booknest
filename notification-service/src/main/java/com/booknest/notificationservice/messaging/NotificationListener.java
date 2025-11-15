package com.booknest.notificationservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.booknest.commonlib.dto.OrderDto;
import com.booknest.commonlib.dto.PaymentDto;
import com.booknest.commonlib.dto.UserDto;

@Component
public class NotificationListener {

    @RabbitListener(queues = "${notification.rabbitmq.queue.order.created}")
    public void handleOrderCreated(OrderDto order) {
        System.out.println("Notification: Order created " + order.getId());
    }

    @RabbitListener(queues = "${notification.rabbitmq.queue.order.status}")
    public void handleOrderStatusChanged(OrderDto order) {
        System.out.println("Notification: Order status changed " + order.getId() + " -> " + order.getStatus());
    }

    @RabbitListener(queues = "${notification.rabbitmq.queue.payment.completed}")
    public void handlePaymentCompleted(PaymentDto payment) {
        System.out.println("Notification: Payment completed for order " + payment.getOrderId());
    }

    @RabbitListener(queues = "${notification.rabbitmq.queue.payment.failed}")
    public void handlePaymentFailed(PaymentDto payment) {
        System.out.println("Notification: Payment failed for order " + payment.getOrderId());
    }

    @RabbitListener(queues = "${notification.rabbitmq.queue.user.registered}")
    public void handleUserRegistered(UserDto user) {
        System.out.println("Notification: New user registered " + user.getEmail());
    }
}

package com.booknest.orderservice.messaging;

import com.booknest.orderservice.model.Order;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class OrderEventListener {

    @RabbitListener(queues = "${order.rabbitmq.queue.created}")
    public void handleOrderCreated(Order order) {
        System.out.println("Received order created: " + order.getId());
        // xử lý gửi thông báo
    }

    @RabbitListener(queues = "${order.rabbitmq.queue.status}")
    public void handleOrderStatusChanged(Order order) {
        System.out.println("Received order status changed: " + order.getId() + " status=" + order.getStatus());
        // xử lý gửi thông báo
    }
}

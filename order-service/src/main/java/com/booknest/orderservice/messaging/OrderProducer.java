package com.booknest.orderservice.messaging;

import com.booknest.orderservice.model.Order;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OrderProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${order.rabbitmq.exchange}")
    private String orderExchange;

    @Value("${order.rabbitmq.routing.created}")
    private String createdRouting;

    @Value("${order.rabbitmq.routing.status}")
    private String statusRouting;

    public OrderProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendOrderCreated(Order order) {
        rabbitTemplate.convertAndSend(orderExchange, createdRouting, order);
    }

    public void sendOrderStatusChanged(Order order) {
        rabbitTemplate.convertAndSend(orderExchange, statusRouting, order);
    }
}

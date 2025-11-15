package com.booknest.notificationservice.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitMQConfig {

    @Value("${order.rabbitmq.exchange}")
    private String orderExchange;

    @Value("${order.rabbitmq.queue.created}")
    private String orderCreatedQueue;

    @Value("${order.rabbitmq.routing.created}")
    private String orderCreatedRouting;

    @Value("${order.rabbitmq.queue.status}")
    private String orderStatusQueue;

    @Value("${order.rabbitmq.routing.status}")
    private String orderStatusRouting;

    @Value("${payment.rabbitmq.exchange}")
    private String paymentExchange;

    @Value("${payment.rabbitmq.routing.completed}")
    private String paymentCompletedRouting;

    @Value("${payment.rabbitmq.routing.failed}")
    private String paymentFailedRouting;

    @Value("${user.rabbitmq.exchange}")
    private String userExchange;

    @Value("${user.rabbitmq.routing.registered}")
    private String userRegisteredRouting;

    @Value("${notification.rabbitmq.queue.order.created}")
    private String notificationOrderCreatedQueue;

    @Value("${notification.rabbitmq.queue.order.status}")
    private String notificationOrderStatusQueue;

    @Value("${notification.rabbitmq.queue.payment.completed}")
    private String notificationPaymentCompletedQueue;

    @Value("${notification.rabbitmq.queue.payment.failed}")
    private String notificationPaymentFailedQueue;

    @Value("${notification.rabbitmq.queue.user.registered}")
    private String notificationUserRegisteredQueue;

    @Bean
    public DirectExchange orderExchange() {
        return new DirectExchange(orderExchange);
    }

    @Bean
    public DirectExchange paymentExchange() {
        return new DirectExchange(paymentExchange);
    }

    @Bean
    public DirectExchange userExchange() {
        return new DirectExchange(userExchange);
    }

    // Queues
    @Bean
    public Queue notificationOrderCreatedQueue() {
        return new Queue(notificationOrderCreatedQueue, true);
    }

    @Bean
    public Queue notificationOrderStatusQueue() {
        return new Queue(notificationOrderStatusQueue, true);
    }

    @Bean
    public Queue notificationPaymentCompletedQueue() {
        return new Queue(notificationPaymentCompletedQueue, true);
    }

    @Bean
    public Queue notificationPaymentFailedQueue() {
        return new Queue(notificationPaymentFailedQueue, true);
    }

    @Bean
    public Queue notificationUserRegisteredQueue() {
        return new Queue(notificationUserRegisteredQueue, true);
    }

    // Bindings
    @Bean
    public Binding bindOrderCreated() {
        return BindingBuilder.bind(notificationOrderCreatedQueue())
                .to(orderExchange())
                .with(orderCreatedRouting);
    }

    @Bean
    public Binding bindOrderStatus() {
        return BindingBuilder.bind(notificationOrderStatusQueue())
                .to(orderExchange())
                .with(orderStatusRouting);
    }

    @Bean
    public Binding bindPaymentCompleted() {
        return BindingBuilder.bind(notificationPaymentCompletedQueue())
                .to(paymentExchange())
                .with(paymentCompletedRouting);
    }

    @Bean
    public Binding bindPaymentFailed() {
        return BindingBuilder.bind(notificationPaymentFailedQueue())
                .to(paymentExchange())
                .with(paymentFailedRouting);
    }

    @Bean
    public Binding bindUserRegistered() {
        return BindingBuilder.bind(notificationUserRegisteredQueue())
                .to(userExchange())
                .with(userRegisteredRouting);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}


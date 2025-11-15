package com.booknest.orderservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
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

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
            Jackson2JsonMessageConverter converter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(converter);
        return template;
    }

    @Bean
    public Jackson2JsonMessageConverter jacksonConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public DirectExchange orderDirectExchange() {
        return new DirectExchange(orderExchange, true, false);
    }

    @Bean
    public Queue orderCreatedQueue() {
        return QueueBuilder.durable(orderCreatedQueue).build();
    }

    @Bean
    public Queue orderStatusChangedQueue() {
        return QueueBuilder.durable(orderStatusQueue).build();
    }

    @Bean
    public Binding bindOrderCreated(Queue orderCreatedQueue, DirectExchange orderDirectExchange) {
        return BindingBuilder.bind(orderCreatedQueue).to(orderDirectExchange).with(orderCreatedRouting);
    }

    @Bean
    public Binding bindOrderStatus(Queue orderStatusChangedQueue, DirectExchange orderDirectExchange) {
        return BindingBuilder.bind(orderStatusChangedQueue).to(orderDirectExchange).with(orderStatusRouting);
    }
}

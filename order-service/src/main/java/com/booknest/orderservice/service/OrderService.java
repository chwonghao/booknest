package com.booknest.orderservice.service;

import com.booknest.commonlib.dto.PaymentDto;
import com.booknest.commonlib.dto.ProductDto;
import com.booknest.commonlib.dto.UserDto;
import com.booknest.orderservice.client.PaymentClient;
import com.booknest.orderservice.client.ProductClient;
import com.booknest.orderservice.client.UserClient;
import com.booknest.orderservice.messaging.OrderProducer;
import com.booknest.orderservice.model.Order;
import com.booknest.orderservice.model.OrderStatus;
import com.booknest.orderservice.repository.OrderRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final OrderProducer producer;
    private final UserClient userClient;
    private final ProductClient productClient;
    private final PaymentClient paymentClient;

    public OrderService(OrderRepository repository, OrderProducer producer, UserClient userClient,
            ProductClient productClient, PaymentClient paymentClient) {
        this.repository = repository;
        this.producer = producer;
        this.userClient = userClient;
        this.productClient = productClient;
        this.paymentClient = paymentClient;
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return repository.findById(id);
    }

    public Order createOrder(Order order) {
        // 1. Xác thực user
        UserDto user = userClient.getUserById(order.getUserId());
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + order.getUserId());
        }

        // 2. Tính tổng tiền từ danh sách sản phẩm
        BigDecimal total = BigDecimal.ZERO;
        for (Long productId : order.getProductIds()) {
            ProductDto product = productClient.getProductById(productId);
            if (product == null || product.getPrice() == null) {
                throw new IllegalArgumentException("Invalid product: " + productId);
            }
            if (product.getStockQuantity() <= 0) {
                throw new IllegalArgumentException("Product out of stock: " + productId);
            }
            total = total.add(product.getPrice());
        }
        order.setTotalAmount(total);

        // 3. Set trạng thái và thời gian
        order.setStatus(order.getStatus() == null ? OrderStatus.PENDING : order.getStatus());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        // 4. Lưu order
        Order saved = repository.save(order);

        // 5. Gọi PaymentService để tạo payment
        PaymentDto payment = new PaymentDto();
        payment.setOrderId(saved.getId());
        payment.setAmount(total);
        payment.setMethod("CREDIT_CARD");
        payment.setStatus("PENDING");
        paymentClient.createPayment(payment);

        // 6. Gửi event "order created" ra RabbitMQ
        producer.sendOrderCreated(saved);

        return saved;
    }

    public Optional<Order> updateOrder(Long id, Order details) {
        return repository.findById(id).map(existing -> {
            existing.setUserId(details.getUserId());
            existing.setProductIds(details.getProductIds());
            existing.setTotalAmount(details.getTotalAmount());
            existing.setStatus(details.getStatus());
            existing.setUpdatedAt(LocalDateTime.now());
            return repository.save(existing);
        });
    }

    public boolean deleteOrder(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Order> getOrdersByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public List<Order> getOrdersByStatus(OrderStatus status) {
        return repository.findByStatus(status);
    }
}

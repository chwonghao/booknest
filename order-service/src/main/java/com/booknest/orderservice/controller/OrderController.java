package com.booknest.orderservice.controller;

import com.booknest.orderservice.model.Order;
import com.booknest.orderservice.model.OrderStatus;
import com.booknest.orderservice.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(service.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return service.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getOrdersByUser(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable OrderStatus status) {
        return ResponseEntity.ok(service.getOrdersByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@Valid @RequestBody Order order) {
        Order created = service.createOrder(order);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @Valid @RequestBody Order details) {
        return service.updateOrder(id, details)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Order> patchOrder(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return service.getOrderById(id).map(order -> {
            updates.forEach((k, v) -> applyPatch(order, k, v));
            return ResponseEntity.ok(service.updateOrder(id, order).orElse(order));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        return service.deleteOrder(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    private void applyPatch(Order order, String key, Object value) {
        switch (key) {
            case "userId" -> order.setUserId(castLong(value));
            case "productIds" -> order.setProductIds(castListLong(value));
            case "totalAmount" -> order.setTotalAmount(castBigDecimal(value));
            case "status" -> order.setStatus(OrderStatus.valueOf(value.toString()));
        }
    }

    private Long castLong(Object v) {
        if (v == null) return null;
        if (v instanceof Number n) return n.longValue();
        return Long.valueOf(v.toString());
    }

    private BigDecimal castBigDecimal(Object v) {
        if (v == null) return null;
        if (v instanceof Number n) return new BigDecimal(n.toString());
        return new BigDecimal(v.toString());
    }

    private List<Long> castListLong(Object v) {
        if (v == null) return null;
        if (v instanceof List<?> list) {
            return list.stream()
                    .map(this::castLong)
                    .collect(Collectors.toList());
        }
        throw new IllegalArgumentException("Invalid productIds format");
    }
}

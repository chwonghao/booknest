package com.booknest.paymentservice.controller;

import com.booknest.paymentservice.model.Payment;
import com.booknest.paymentservice.model.PaymentStatus;
import com.booknest.paymentservice.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return service.getAllPayments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return service.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/order/{orderId}")
    public List<Payment> getPaymentsByOrder(@PathVariable Long orderId) {
        return service.getPaymentsByOrder(orderId);
    }

    @GetMapping("/status/{status}")
    public List<Payment> getPaymentsByStatus(@PathVariable PaymentStatus status) {
        return service.getPaymentsByStatus(status);
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return service.createPayment(payment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment details) {
        return service.updatePayment(id, details)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Payment> patchPayment(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return service.getPaymentById(id).map(payment -> {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "status" -> payment.setStatus(PaymentStatus.valueOf(value.toString()));
                    case "transactionId" -> payment.setTransactionId(value.toString());
                    case "amount" -> payment.setAmount(new java.math.BigDecimal(value.toString()));
                }
            });
            payment.setUpdatedAt(java.time.LocalDateTime.now());
            return ResponseEntity.ok(service.createPayment(payment));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        return service.deletePayment(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}

package com.booknest.paymentservice.service;

import com.booknest.paymentservice.model.Payment;
import com.booknest.paymentservice.model.PaymentStatus;
import com.booknest.paymentservice.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public List<Payment> getAllPayments() {
        return repository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return repository.findById(id);
    }

    public Payment createPayment(Payment payment) {
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());
        return repository.save(payment);
    }

    public Optional<Payment> updatePayment(Long id, Payment details) {
        return repository.findById(id).map(existing -> {
            existing.setOrderId(details.getOrderId());
            existing.setAmount(details.getAmount());
            existing.setMethod(details.getMethod());
            existing.setStatus(details.getStatus());
            existing.setTransactionId(details.getTransactionId());
            existing.setUpdatedAt(LocalDateTime.now());
            return repository.save(existing);
        });
    }

    public boolean deletePayment(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Payment> getPaymentsByOrder(Long orderId) {
        return repository.findByOrderId(orderId);
    }

    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return repository.findByStatus(status);
    }
}

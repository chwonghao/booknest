package com.booknest.orderservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Embeddable
public class OrderItem {

    @NotNull
    @Column(name = "product_id")
    private Long productId;

    @NotNull
    @Positive
    @Column(name = "quantity")
    private Integer quantity;

    // Constructors, Getters and Setters

    public OrderItem() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

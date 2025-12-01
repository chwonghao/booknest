package com.booknest.orderservice.model;

public enum OrderStatus {
    PENDING,        // mới tạo
    CONFIRMED,      // đã xác nhận
    PAID,           // đã thanh toán
    SHIPPED,        // đã gửi
    DELIVERED,      // đã giao
    COMPLETED,      // hoàn tất
    CANCELLED,      // đã hủy
    RETURNED,       // trả hàng
    REFUNDED        // hoàn tiền
}

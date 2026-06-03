package com.burgers.model;

import com.burgers.model.enums.OrderStatus;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    private String id;

    private String userId;

    private List<OrderItem> items;

    private double totalAmount;

    @Builder.Default
    private OrderStatus status = OrderStatus.PLACED;

    private String deliveryAddress;

    private String paymentId;

    private String razorpayOrderId;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem {
        private String burgerId;
        private String burgerName;
        private int quantity;
        private double price;
    }
}

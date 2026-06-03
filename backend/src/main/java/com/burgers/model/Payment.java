package com.burgers.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    private String id;

    private String userId;

    private String orderId;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

    private double amount;

    @Builder.Default
    private String status = "SUCCESS";

    @CreatedDate
    private Instant createdAt;
}

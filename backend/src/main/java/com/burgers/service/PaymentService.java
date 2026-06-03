package com.burgers.service;

import com.burgers.dto.request.CheckoutRequest;
import com.burgers.exception.BadRequestException;
import com.burgers.model.Payment;
import com.burgers.repository.OrderRepository;
import com.burgers.repository.PaymentRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Value("${razorpay.api-key}")
    private String razorpayApiKey;

    @Value("${razorpay.api-secret}")
    private String razorpayApiSecret;

    public String getApiKey() {
        return razorpayApiKey;
    }

    public JSONObject createOrder(CheckoutRequest request) {
        try {
            JSONObject options = new JSONObject();
            options.put("amount", (int) (request.getAmount() * 100)); // Convert to paise
            options.put("currency", "INR");
            options.put("receipt", "order_" + System.currentTimeMillis());

            com.razorpay.Order razorpayOrder = razorpayClient.orders.create(options);
            log.info("Razorpay order created: {}", (Object) razorpayOrder.get("id"));

            return razorpayOrder.toJson();
        } catch (RazorpayException e) {
            log.error("Failed to create Razorpay order", e);
            throw new BadRequestException("Payment order creation failed");
        }
    }

    public Payment verifyPayment(String razorpayOrderId, String razorpayPaymentId,
                                  String razorpaySignature, String userId, String orderId) {
        String body = razorpayOrderId + "|" + razorpayPaymentId;
        String expectedSignature = generateHmacSha256(body, razorpayApiSecret);

        if (!expectedSignature.equals(razorpaySignature)) {
            throw new BadRequestException("Invalid payment signature");
        }

        Payment payment = Payment.builder()
                .userId(userId)
                .orderId(orderId)
                .razorpayOrderId(razorpayOrderId)
                .razorpayPaymentId(razorpayPaymentId)
                .razorpaySignature(razorpaySignature)
                .status("SUCCESS")
                .build();

        final Payment savedPayment = paymentRepository.save(payment);

        // Update order with payment ID
        if (orderId != null) {
            orderRepository.findById(orderId).ifPresent(order -> {
                order.setPaymentId(savedPayment.getId());
                order.setRazorpayOrderId(razorpayOrderId);
                orderRepository.save(order);
            });
        }

        log.info("Payment verified: {}", razorpayPaymentId);
        return savedPayment;
    }

    private String generateHmacSha256(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                    secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate HMAC signature", e);
        }
    }
}

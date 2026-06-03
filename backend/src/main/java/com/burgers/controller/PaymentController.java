package com.burgers.controller;

import com.burgers.dto.request.CheckoutRequest;
import com.burgers.dto.response.ApiResponse;
import com.burgers.model.Payment;
import com.burgers.model.User;
import com.burgers.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Tag(name = "Payment", description = "Razorpay payment integration")
public class PaymentController {

    private final PaymentService paymentService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @GetMapping("/key")
    @Operation(summary = "Get Razorpay API key")
    public ResponseEntity<ApiResponse<Map<String, String>>> getKey() {
        return ResponseEntity.ok(ApiResponse.success(Map.of("key", paymentService.getApiKey())));
    }

    @PostMapping("/checkout")
    @Operation(summary = "Create a payment order")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkout(
            @Valid @RequestBody CheckoutRequest request) {

        JSONObject order = paymentService.createOrder(request);
        return ResponseEntity.ok(ApiResponse.success(Map.of(
                "orderId", order.getString("id"),
                "amount", order.getInt("amount"),
                "currency", order.getString("currency")
        )));
    }

    @PostMapping("/verification")
    @Operation(summary = "Verify payment after completion")
    public ResponseEntity<Void> verifyPayment(
            @RequestParam String razorpay_order_id,
            @RequestParam String razorpay_payment_id,
            @RequestParam String razorpay_signature,
            @RequestParam(required = false) String user_id,
            @RequestParam(required = false) String order_id) {

        paymentService.verifyPayment(
                razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, order_id);

        return ResponseEntity.status(302)
                .header("Location", frontendUrl + "/paymentsuccess?reference=" + razorpay_payment_id)
                .build();
    }
}

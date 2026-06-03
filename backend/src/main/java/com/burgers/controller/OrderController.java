package com.burgers.controller;

import com.burgers.dto.request.OrderRequest;
import com.burgers.dto.response.ApiResponse;
import com.burgers.model.Order;
import com.burgers.model.User;
import com.burgers.model.enums.OrderStatus;
import com.burgers.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order management with real-time tracking")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Place a new order")
    public ResponseEntity<ApiResponse<Order>> createOrder(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody OrderRequest request) {

        Order order = orderService.createOrder(user.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Order placed successfully", order));
    }

    @GetMapping("/my-orders")
    @Operation(summary = "Get current user's order history")
    public ResponseEntity<ApiResponse<List<Order>>> getMyOrders(@AuthenticationPrincipal User user) {
        List<Order> orders = orderService.getUserOrders(user.getId());
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID")
    public ResponseEntity<ApiResponse<Order>> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @PatchMapping("/{id}/cancel")
    @Operation(summary = "Cancel an order")
    public ResponseEntity<ApiResponse<Order>> cancelOrder(
            @AuthenticationPrincipal User user,
            @PathVariable String id) {

        Order order = orderService.cancelOrder(id, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Order cancelled", order));
    }

    // Admin endpoints
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update order status (Admin only)")
    public ResponseEntity<ApiResponse<Order>> updateStatus(
            @PathVariable String id,
            @RequestParam OrderStatus status) {

        Order order = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Order status updated", order));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all orders by status (Admin only)")
    public ResponseEntity<ApiResponse<List<Order>>> getOrdersByStatus(
            @RequestParam(required = false) OrderStatus status) {

        List<Order> orders = (status != null)
                ? orderService.getOrdersByStatus(status)
                : orderService.getOrdersByStatus(OrderStatus.PLACED);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }
}

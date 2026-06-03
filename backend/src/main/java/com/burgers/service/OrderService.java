package com.burgers.service;

import com.burgers.dto.request.OrderRequest;
import com.burgers.exception.BadRequestException;
import com.burgers.exception.ResourceNotFoundException;
import com.burgers.model.Burger;
import com.burgers.model.Order;
import com.burgers.model.User;
import com.burgers.model.enums.OrderStatus;
import com.burgers.repository.BurgerRepository;
import com.burgers.repository.OrderRepository;
import com.burgers.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final BurgerRepository burgerRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final EmailService emailService;

    public Order createOrder(String userId, OrderRequest request) {
        List<Order.OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0;

        for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Burger burger = burgerRepository.findById(itemReq.getBurgerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Burger not found: " + itemReq.getBurgerId()));

            if (!burger.isAvailable() || burger.getStock() < itemReq.getQuantity()) {
                throw new BadRequestException("Burger '" + burger.getName() + "' is unavailable or out of stock");
            }

            // Decrease stock
            burger.setStock(burger.getStock() - itemReq.getQuantity());
            burgerRepository.save(burger);

            Order.OrderItem item = Order.OrderItem.builder()
                    .burgerId(burger.getId())
                    .burgerName(burger.getName())
                    .quantity(itemReq.getQuantity())
                    .price(burger.getPrice() * itemReq.getQuantity())
                    .build();

            orderItems.add(item);
            totalAmount += item.getPrice();
        }

        Order order = Order.builder()
                .userId(userId)
                .items(orderItems)
                .totalAmount(totalAmount)
                .deliveryAddress(request.getDeliveryAddress())
                .status(OrderStatus.PLACED)
                .build();

        order = orderRepository.save(order);

        // Add to user's order history
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.getOrderHistory().add(order.getId());
        userRepository.save(user);

        // Send real-time notification
        messagingTemplate.convertAndSendToUser(userId, "/queue/orders",
                Map.of("type", "ORDER_PLACED", "orderId", order.getId(), "status", order.getStatus()));

        return order;
    }

    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));
    }

    public Order updateOrderStatus(String orderId, OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        order = orderRepository.save(order);

        // Notify user via WebSocket
        messagingTemplate.convertAndSendToUser(order.getUserId(), "/queue/orders",
                Map.of("type", "STATUS_UPDATE", "orderId", orderId, "status", status));

        // Send email on delivery
        if (status == OrderStatus.CONFIRMED) {
            User user = userRepository.findById(order.getUserId()).orElse(null);
            if (user != null) {
                emailService.sendOrderConfirmation(user.getEmail(), orderId, order.getTotalAmount());
            }
        }

        log.info("Order {} status updated to {}", orderId, status);
        return order;
    }

    public Order cancelOrder(String orderId, String userId) {
        Order order = getOrderById(orderId);

        if (!order.getUserId().equals(userId)) {
            throw new BadRequestException("You can only cancel your own orders");
        }
        if (order.getStatus() != OrderStatus.PLACED && order.getStatus() != OrderStatus.CONFIRMED) {
            throw new BadRequestException("Order cannot be cancelled in current state");
        }

        // Restore stock
        for (Order.OrderItem item : order.getItems()) {
            burgerRepository.findById(item.getBurgerId()).ifPresent(burger -> {
                burger.setStock(burger.getStock() + item.getQuantity());
                burgerRepository.save(burger);
            });
        }

        order.setStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
}

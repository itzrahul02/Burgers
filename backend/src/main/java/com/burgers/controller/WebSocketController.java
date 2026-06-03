package com.burgers.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@Tag(name = "WebSocket", description = "Real-time order notifications")
public class WebSocketController {

    @MessageMapping("/order.subscribe")
    @SendTo("/topic/orders")
    @Operation(summary = "Subscribe to order updates")
    public Map<String, String> subscribeToOrders(Map<String, String> message) {
        return Map.of("type", "SUBSCRIBED", "message", "Connected to order updates");
    }
}

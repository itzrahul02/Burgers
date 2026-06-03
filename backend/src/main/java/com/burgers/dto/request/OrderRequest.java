package com.burgers.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    @NotEmpty(message = "Order must have at least one item")
    private List<OrderItemRequest> items;

    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    @Data
    public static class OrderItemRequest {
        @NotBlank(message = "Burger ID is required")
        private String burgerId;

        private int quantity = 1;
    }
}

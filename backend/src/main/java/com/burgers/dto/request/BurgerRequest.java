package com.burgers.dto.request;

import com.burgers.model.enums.BurgerCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class BurgerRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Category is required")
    private BurgerCategory category;

    private Integer stock;
}

package com.burgers.model;

import com.burgers.model.enums.BurgerCategory;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "burgers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Burger {

    @Id
    private String id;

    private String adminId;

    private String name;

    private double price;

    private String description;

    private String image;

    private BurgerCategory category;

    @Builder.Default
    private boolean available = true;

    @Builder.Default
    private int stock = 100;

    @CreatedDate
    private Instant createdAt;
}

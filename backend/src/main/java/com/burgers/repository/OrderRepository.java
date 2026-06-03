package com.burgers.repository;

import com.burgers.model.Order;
import com.burgers.model.enums.OrderStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Order> findByStatus(OrderStatus status);

    List<Order> findByUserIdAndStatus(String userId, OrderStatus status);
}

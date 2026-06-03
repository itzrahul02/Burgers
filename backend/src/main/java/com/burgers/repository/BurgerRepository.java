package com.burgers.repository;

import com.burgers.model.Burger;
import com.burgers.model.enums.BurgerCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BurgerRepository extends MongoRepository<Burger, String> {

    List<Burger> findByCategory(BurgerCategory category);

    List<Burger> findByAvailableTrue();

    List<Burger> findByNameContainingIgnoreCase(String name);
}

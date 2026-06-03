package com.burgers.service;

import com.burgers.dto.request.BurgerRequest;
import com.burgers.exception.ResourceNotFoundException;
import com.burgers.model.Burger;
import com.burgers.model.enums.BurgerCategory;
import com.burgers.repository.BurgerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BurgerService {

    private final BurgerRepository burgerRepository;
    private final CloudinaryService cloudinaryService;

    @Cacheable(value = "burgers", key = "'all'")
    public List<Burger> getAllBurgers() {
        return burgerRepository.findByAvailableTrue();
    }

    @Cacheable(value = "burgers", key = "#category")
    public List<Burger> getBurgersByCategory(BurgerCategory category) {
        return burgerRepository.findByCategory(category);
    }

    public Burger getBurgerById(String id) {
        return burgerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Burger not found with id: " + id));
    }

    public List<Burger> searchBurgers(String query) {
        return burgerRepository.findByNameContainingIgnoreCase(query);
    }

    @CacheEvict(value = "burgers", allEntries = true)
    public Burger addBurger(BurgerRequest request, MultipartFile image, String adminId) {
        String imageUrl = cloudinaryService.uploadImage(image);

        Burger burger = Burger.builder()
                .adminId(adminId)
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .image(imageUrl)
                .category(request.getCategory())
                .stock(request.getStock() != null ? request.getStock() : 100)
                .build();

        return burgerRepository.save(burger);
    }

    @CacheEvict(value = "burgers", allEntries = true)
    public Burger updateBurger(String id, BurgerRequest request, MultipartFile image) {
        Burger burger = getBurgerById(id);

        if (request.getName() != null) burger.setName(request.getName());
        if (request.getPrice() != null) burger.setPrice(request.getPrice());
        if (request.getDescription() != null) burger.setDescription(request.getDescription());
        if (request.getCategory() != null) burger.setCategory(request.getCategory());
        if (request.getStock() != null) burger.setStock(request.getStock());

        if (image != null && !image.isEmpty()) {
            cloudinaryService.deleteImage(burger.getImage());
            String newImageUrl = cloudinaryService.uploadImage(image);
            burger.setImage(newImageUrl);
        }

        return burgerRepository.save(burger);
    }

    @CacheEvict(value = "burgers", allEntries = true)
    public void deleteBurger(String id) {
        Burger burger = getBurgerById(id);
        cloudinaryService.deleteImage(burger.getImage());
        burgerRepository.deleteById(id);
    }

    @CacheEvict(value = "burgers", allEntries = true)
    public Burger toggleAvailability(String id) {
        Burger burger = getBurgerById(id);
        burger.setAvailable(!burger.isAvailable());
        return burgerRepository.save(burger);
    }
}

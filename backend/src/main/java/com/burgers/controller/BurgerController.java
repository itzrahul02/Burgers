package com.burgers.controller;

import com.burgers.dto.request.BurgerRequest;
import com.burgers.dto.response.ApiResponse;
import com.burgers.model.Burger;
import com.burgers.model.User;
import com.burgers.model.enums.BurgerCategory;
import com.burgers.service.BurgerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/burgers")
@RequiredArgsConstructor
@Tag(name = "Burgers", description = "Burger menu management")
public class BurgerController {

    private final BurgerService burgerService;

    @GetMapping("/menu")
    @Operation(summary = "Get all available burgers")
    public ResponseEntity<ApiResponse<List<Burger>>> getAllBurgers() {
        List<Burger> burgers = burgerService.getAllBurgers();
        return ResponseEntity.ok(ApiResponse.success(burgers));
    }

    @GetMapping("/menu/{id}")
    @Operation(summary = "Get burger by ID")
    public ResponseEntity<ApiResponse<Burger>> getBurgerById(@PathVariable String id) {
        Burger burger = burgerService.getBurgerById(id);
        return ResponseEntity.ok(ApiResponse.success(burger));
    }

    @GetMapping("/menu/category/{category}")
    @Operation(summary = "Get burgers by category")
    public ResponseEntity<ApiResponse<List<Burger>>> getBurgersByCategory(
            @PathVariable BurgerCategory category) {
        List<Burger> burgers = burgerService.getBurgersByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(burgers));
    }

    @GetMapping("/menu/search")
    @Operation(summary = "Search burgers by name")
    public ResponseEntity<ApiResponse<List<Burger>>> searchBurgers(@RequestParam String q) {
        List<Burger> burgers = burgerService.searchBurgers(q);
        return ResponseEntity.ok(ApiResponse.success(burgers));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Add a new burger (Admin only)")
    public ResponseEntity<ApiResponse<Burger>> addBurger(
            @Valid @ModelAttribute BurgerRequest request,
            @RequestParam("image") MultipartFile image,
            @AuthenticationPrincipal User admin) {

        Burger burger = burgerService.addBurger(request, image, admin.getId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Burger added successfully", burger));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Update a burger (Admin only)")
    public ResponseEntity<ApiResponse<Burger>> updateBurger(
            @PathVariable String id,
            @Valid @ModelAttribute BurgerRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Burger burger = burgerService.updateBurger(id, request, image);
        return ResponseEntity.ok(ApiResponse.success("Burger updated", burger));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a burger (Admin only)")
    public ResponseEntity<ApiResponse<Void>> deleteBurger(@PathVariable String id) {
        burgerService.deleteBurger(id);
        return ResponseEntity.ok(ApiResponse.success("Burger deleted", null));
    }

    @PatchMapping("/{id}/toggle")
    @Operation(summary = "Toggle burger availability (Admin only)")
    public ResponseEntity<ApiResponse<Burger>> toggleAvailability(@PathVariable String id) {
        Burger burger = burgerService.toggleAvailability(id);
        return ResponseEntity.ok(ApiResponse.success(burger));
    }
}

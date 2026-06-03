package com.burgers.controller;

import com.burgers.dto.request.RegisterRequest;
import com.burgers.dto.response.ApiResponse;
import com.burgers.dto.response.UserResponse;
import com.burgers.model.User;
import com.burgers.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Tag(name = "User", description = "User profile management")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Get current user's profile")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(@AuthenticationPrincipal User user) {
        UserResponse profile = userService.getProfile(user.getId());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update user profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody RegisterRequest request) {
        UserResponse updated = userService.updateProfile(user.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated", updated));
    }

    @GetMapping("/avatar")
    @Operation(summary = "Get user's avatar URL")
    public ResponseEntity<ApiResponse<Map<String, String>>> getAvatar(@AuthenticationPrincipal User user) {
        String avatar = userService.getAvatar(user.getId());
        return ResponseEntity.ok(ApiResponse.success(Map.of("avatar", avatar != null ? avatar : "")));
    }
}

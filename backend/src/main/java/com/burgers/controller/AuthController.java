package com.burgers.controller;

import com.burgers.dto.request.LoginRequest;
import com.burgers.dto.request.RegisterRequest;
import com.burgers.dto.response.ApiResponse;
import com.burgers.dto.response.AuthResponse;
import com.burgers.model.User;
import com.burgers.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User registration, login, and logout")
public class AuthController {

    private final UserService userService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Register a new user")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @ModelAttribute RegisterRequest request,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar,
            HttpServletResponse response) {

        AuthResponse authResponse = userService.register(request, avatar);
        setAuthCookies(response, authResponse);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Registration successful", authResponse));
    }

    @PostMapping("/login")
    @Operation(summary = "Login with email and password")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {

        AuthResponse authResponse = userService.login(request);
        setAuthCookies(response, authResponse);

        return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout current user")
    public ResponseEntity<ApiResponse<Void>> logout(
            @AuthenticationPrincipal User user,
            HttpServletResponse response) {

        userService.logout(user.getId());
        clearAuthCookies(response);

        return ResponseEntity.ok(ApiResponse.success("Logout successful", null));
    }

    @GetMapping("/verify")
    @Operation(summary = "Verify user email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@RequestParam String code) {
        userService.verifyEmail(code);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully", null));
    }

    private void setAuthCookies(HttpServletResponse response, AuthResponse authResponse) {
        Cookie accessCookie = new Cookie("accessToken", authResponse.getAccessToken());
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(900); // 15 minutes
        accessCookie.setSecure(false); // Set to true in production

        Cookie refreshCookie = new Cookie("refreshToken", authResponse.getRefreshToken());
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        refreshCookie.setSecure(false); // Set to true in production

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
    }

    private void clearAuthCookies(HttpServletResponse response) {
        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(0);

        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
    }
}

package com.burgers.service;

import com.burgers.dto.request.LoginRequest;
import com.burgers.dto.request.RegisterRequest;
import com.burgers.dto.response.AuthResponse;
import com.burgers.dto.response.UserResponse;
import com.burgers.exception.BadRequestException;
import com.burgers.exception.ResourceNotFoundException;
import com.burgers.model.User;
import com.burgers.model.enums.Role;
import com.burgers.repository.UserRepository;
import com.burgers.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final CloudinaryService cloudinaryService;
    private final EmailService emailService;

    public AuthResponse register(RegisterRequest request, MultipartFile avatar) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already taken");
        }

        String avatarUrl = null;
        if (avatar != null && !avatar.isEmpty()) {
            avatarUrl = cloudinaryService.uploadImage(avatar);
        }

        User user = User.builder()
                .name(request.getName())
                .username(request.getUsername().toLowerCase().trim())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .avatar(avatarUrl)
                .role(Role.USER)
                .build();

        user = userRepository.save(user);

        // Send verification email asynchronously
        emailService.sendVerificationEmail(user.getEmail(), user.getId());

        return generateAuthResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        return generateAuthResponse(user);
    }

    public void logout(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setRefreshToken(null);
        userRepository.save(user);
    }

    public UserResponse getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserResponse(user);
    }

    public String getAvatar(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getAvatar();
    }

    public void verifyEmail(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEmailVerified(true);
        userRepository.save(user);
    }

    public UserResponse updateProfile(String userId, RegisterRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.getName() != null) user.setName(request.getName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAddress() != null) user.setAddress(request.getAddress());

        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    private AuthResponse generateAuthResponse(User user) {
        String accessToken = jwtTokenProvider.generateAccessToken(
                user.getId(), user.getEmail(), user.getRole().name());
        String refreshToken = jwtTokenProvider.generateRefreshToken(
                user.getId(), user.getEmail(), user.getRole().name());

        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(mapToUserResponse(user))
                .build();
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole())
                .avatar(user.getAvatar())
                .emailVerified(user.isEmailVerified())
                .build();
    }
}

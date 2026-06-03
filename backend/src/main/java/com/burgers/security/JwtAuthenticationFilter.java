package com.burgers.security;

import com.burgers.model.User;
import com.burgers.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String accessToken = extractTokenFromCookie(request, "accessToken");
        String refreshToken = extractTokenFromCookie(request, "refreshToken");

        // Also check Authorization header
        if (accessToken == null) {
            accessToken = extractTokenFromHeader(request);
        }

        if (accessToken != null && jwtTokenProvider.validateAccessToken(accessToken)) {
            setAuthentication(accessToken, true);
        } else if (refreshToken != null && jwtTokenProvider.validateRefreshToken(refreshToken)) {
            // Access token expired/invalid, but refresh token is valid - issue new access token
            String userId = jwtTokenProvider.getUserIdFromRefreshToken(refreshToken);
            User user = userRepository.findById(userId).orElse(null);

            if (user != null) {
                String newAccessToken = jwtTokenProvider.generateAccessToken(
                        user.getId(), user.getEmail(), user.getRole().name());

                Cookie cookie = new Cookie("accessToken", newAccessToken);
                cookie.setHttpOnly(true);
                cookie.setPath("/");
                cookie.setMaxAge(900); // 15 minutes
                response.addCookie(cookie);

                setAuthentication(userId, user);
            }
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String token, boolean fromAccessToken) {
        String userId = jwtTokenProvider.getUserIdFromAccessToken(token);
        userRepository.findById(userId).ifPresent(user -> setAuthentication(userId, user));
    }

    private void setAuthentication(String userId, User user) {
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
                );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String extractTokenFromCookie(HttpServletRequest request, String cookieName) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}

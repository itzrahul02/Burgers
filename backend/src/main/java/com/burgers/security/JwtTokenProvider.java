package com.burgers.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.access-token.secret}")
    private String accessTokenSecret;

    @Value("${jwt.access-token.expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token.secret}")
    private String refreshTokenSecret;

    @Value("${jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;

    public String generateAccessToken(String userId, String email, String role) {
        return buildToken(userId, email, role, accessTokenSecret, accessTokenExpiration);
    }

    public String generateRefreshToken(String userId, String email, String role) {
        return buildToken(userId, email, role, refreshTokenSecret, refreshTokenExpiration);
    }

    private String buildToken(String userId, String email, String role, String secret, long expiration) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .subject(userId)
                .claim("email", email)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String getUserIdFromAccessToken(String token) {
        return getClaims(token, accessTokenSecret).getSubject();
    }

    public String getUserIdFromRefreshToken(String token) {
        return getClaims(token, refreshTokenSecret).getSubject();
    }

    public boolean validateAccessToken(String token) {
        return validateToken(token, accessTokenSecret);
    }

    public boolean validateRefreshToken(String token) {
        return validateToken(token, refreshTokenSecret);
    }

    private boolean validateToken(String token, String secret) {
        try {
            getClaims(token, secret);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims getClaims(String token, String secret) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

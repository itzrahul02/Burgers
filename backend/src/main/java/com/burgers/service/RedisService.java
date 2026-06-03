package com.burgers.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void set(String key, Object value, Duration ttl) {
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }

    public boolean exists(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void setWithPrefix(String prefix, String id, Object value, Duration ttl) {
        set(prefix + ":" + id, value, ttl);
    }

    public Object getWithPrefix(String prefix, String id) {
        return get(prefix + ":" + id);
    }

    public void deleteWithPrefix(String prefix, String id) {
        delete(prefix + ":" + id);
    }
}

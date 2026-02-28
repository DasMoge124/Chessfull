package com.chessfull.chessfull.config;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Filter to apply IP-based rate limiting to incoming requests.
 * Uses a fixed-window algorithm to restrict the number of requests per IP
 * address.
 */
@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final Map<String, RequestInfo> clientRequestInfoMap = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private static final long TIME_WINDOW_MS = 60000; // 1 minute

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        if (isAllowed(ip)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("Too many requests. Please try again later.");
        }
    }

    private boolean isAllowed(String ip) {
        long currentTime = System.currentTimeMillis();
        RequestInfo requestInfo = clientRequestInfoMap.computeIfAbsent(ip,
                k -> new RequestInfo(currentTime, new AtomicInteger(0)));

        synchronized (requestInfo) {
            if (currentTime - requestInfo.windowStartTime > TIME_WINDOW_MS) {
                requestInfo.windowStartTime = currentTime;
                requestInfo.requestCount.set(0);
            }
            return requestInfo.requestCount.incrementAndGet() <= MAX_REQUESTS_PER_MINUTE;
        }
    }

    private static class RequestInfo {
        long windowStartTime;
        AtomicInteger requestCount;

        RequestInfo(long windowStartTime, AtomicInteger requestCount) {
            this.windowStartTime = windowStartTime;
            this.requestCount = requestCount;
        }
    }
}

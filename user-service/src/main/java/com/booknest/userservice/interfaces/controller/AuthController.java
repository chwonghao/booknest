package com.booknest.userservice.interfaces.controller;

import com.booknest.userservice.application.dto.JwtAuthResponse;
import com.booknest.userservice.application.dto.LoginRequest;
import com.booknest.userservice.domain.model.User;
import com.booknest.userservice.domain.repository.UserRepository;
import com.booknest.userservice.infrastructure.security.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    // Đăng nhập: trả về access token + refresh token
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.loginSuccess();
        userRepository.save(user);

        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication.getName());

        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(granted -> granted.getAuthority())
                .toList();

        JwtAuthResponse response = new JwtAuthResponse(accessToken, refreshToken, authentication.getName(), roles);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthResponse> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (refreshToken == null || !tokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = tokenProvider.getUsername(refreshToken);
        String newAccessToken = tokenProvider.generateTokenFromUsername(username);

        JwtAuthResponse response = new JwtAuthResponse(newAccessToken, refreshToken, username, List.of());
        return ResponseEntity.ok(response);
    }
}

package com.booknest.userservice.application.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class JwtAuthResponse {
    private final String accessToken;
    private final String refreshToken;
    private final String tokenType = "Bearer";
    private final String username;
    private final List<String> roles;

    public JwtAuthResponse(String accessToken, String refreshToken, String username, List<String> roles) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.username = username;
        this.roles = roles;
    }

    public JwtAuthResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.username = null;
        this.roles = null;
    }
}

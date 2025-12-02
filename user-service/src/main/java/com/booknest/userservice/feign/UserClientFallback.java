package com.booknest.userservice.feign;

import org.springframework.stereotype.Component;
import com.booknest.commonlib.dto.UserDto;

@Component
public class UserClientFallback implements UserClient {

    @Override
    public UserDto getUserById(Long id) {
        // Trả về null hoặc một DTO mặc định khi service không phản hồi
        UserDto fallbackUser = new UserDto();
        fallbackUser.setId(id);
        fallbackUser.setFullName("Unknown User");
        fallbackUser.setEmail("unavailable@example.com");
        return fallbackUser;
    }
}

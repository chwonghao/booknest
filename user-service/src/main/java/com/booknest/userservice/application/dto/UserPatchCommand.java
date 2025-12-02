package com.booknest.userservice.application.dto;

import com.booknest.userservice.domain.model.Role;
import com.booknest.userservice.domain.model.Status;
import com.booknest.userservice.domain.model.Gender;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserPatchCommand {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private Gender gender;
    private String avatarUrl;
    private Role role;
    private Status status;
}

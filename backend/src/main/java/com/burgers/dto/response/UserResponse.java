package com.burgers.dto.response;

import com.burgers.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String id;
    private String name;
    private String username;
    private String email;
    private String phone;
    private String address;
    private Role role;
    private String avatar;
    private boolean emailVerified;
}

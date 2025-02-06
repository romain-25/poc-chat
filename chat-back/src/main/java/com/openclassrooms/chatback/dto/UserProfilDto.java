package com.openclassrooms.chatback.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserProfilDto {
    private String username;
    private String email;
    public UserProfilDto(String username, String email) {
        this.username = username;
        this.email = email;
    }
}

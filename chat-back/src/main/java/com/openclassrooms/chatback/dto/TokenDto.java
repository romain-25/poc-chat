package com.openclassrooms.chatback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class TokenDto {
    private String token;
    private long id;
    private String username;
    private String email;
}

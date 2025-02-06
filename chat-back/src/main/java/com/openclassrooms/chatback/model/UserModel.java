package com.openclassrooms.chatback.model;

import jakarta.persistence.*;
import lombok.*;


@Data
@Entity
@Table(name = "user")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String password;

}

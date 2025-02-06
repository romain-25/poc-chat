package com.openclassrooms.chatback.repository;

import com.openclassrooms.chatback.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    public UserModel findByEmail(String email);
    public UserModel findByUsername(String username);
}

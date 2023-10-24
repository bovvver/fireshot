package com.github.fireshot.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    /**
     * Searches for a User by email, if exists.
     *
     * @param email email passed to identify user account.
     * @return {@code Optional<User>} found by email, if exists.
     */
    Optional<User> findByEmail(String email);

    /**
     * Checks if User exists by email.
     *
     * @param email email passed to identify user account.
     * @return {@code true} if User is found or {@code false} if not.
     */
    boolean existsByEmail(String email);

}
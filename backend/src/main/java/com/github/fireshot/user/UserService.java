package com.github.fireshot.user;

import com.github.fireshot.exceptions.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

/**
 * UserService class containing business logic for {@code User.class}.
 * This class is connecting {@code UserController.class} and {@code UserRepository.class}
 */
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    /**
     * UserRepository component containing methods to connect with MySQL database.
     */
    private UserRepository userRepository;
    /**
     * PasswordEncoder component responsible for encoding passwords.
     */
    private PasswordEncoder passwordEncoder;

    /**
     * Saves passed User to repository.
     *
     * @param user passed to be saved in repository.
     */
    public void createUser(UserDetails user) {
        if (isUserExistsByEmail(user.getUsername()))
            throw new UserAlreadyExistsException("User with this e-mail already exists.");

        ((User) user).setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save((User) user);
    }

    /**
     * Checks if User exists by email.
     *
     * @param username identifier passed to identify user account.
     * @return {@code true} if User is found or {@code false} if not.
     */
    public boolean isUserExistsByEmail(String username) {
        return userRepository.existsByEmail(username);
    }

    /**
     * Loads User, if exists in the database.
     *
     * @param email identifier passed to identify user account.
     * @return {@code UserDetails} - User entity from database.
     * @throws UsernameNotFoundException if User is not found in database.
     */
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        MessageFormat.format("username {0} not found", email)
                ));
    }
}
package com.github.fireshot.user;

import com.github.fireshot.dto.RegisterRequestDTO;
import com.github.fireshot.enums.Role;
import com.github.fireshot.exceptions.RegistrationValidationException;
import com.github.fireshot.exceptions.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    public void createUser(RegisterRequestDTO registerRequestDTO) {
        validateUser(registerRequestDTO);

        User user = new User(registerRequestDTO.email(), registerRequestDTO.nickname(), registerRequestDTO.password(), Role.USER, false, false, true);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    /**
     * Checks if User exists by email.
     *
     * @param email identifier passed to identify user account.
     * @return {@code true} if User is found or {@code false} if not.
     */
    public boolean isUserExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean isUserExistsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    /**
     * Loads User, if exists in the database.
     *
     * @param email identifier passed to identify user account.
     * @return {@code UserDetails} - User entity from database.
     * @throws UsernameNotFoundException if User is not found in database.
     */
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        MessageFormat.format("username {0} not found", email)
                ));
    }

    private void validateUser(RegisterRequestDTO user) {
        Pattern emailRegex = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        Pattern passwordRegex = Pattern.compile("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\-]).{8,}$");

        Matcher emailMatcher = emailRegex.matcher(user.email());
        Matcher passwordMatcher = passwordRegex.matcher(user.password());

        if (!emailMatcher.matches())
            throw new RegistrationValidationException("Invalid e-mail");
        if(!passwordMatcher.matches())
            throw new RegistrationValidationException("Password is to weak.");
        if(!user.password().equals(user.confirmPassword()))
            throw new RegistrationValidationException("Passwords doesn't match.");
        if(isUserExistsByNickname(user.nickname()))
            throw new UserAlreadyExistsException("User with this nickname already exists.");
        if (isUserExistsByEmail(user.email()))
            throw new UserAlreadyExistsException("User with this e-mail already exists.");
    }
}
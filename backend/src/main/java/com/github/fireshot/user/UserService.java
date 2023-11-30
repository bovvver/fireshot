package com.github.fireshot.user;

import com.github.fireshot.dto.RegisterRequestDTO;
import com.github.fireshot.dto.ResponseDTO;
import com.github.fireshot.dto.ResponseSetDTO;
import com.github.fireshot.enums.Role;
import com.github.fireshot.exceptions.RegistrationValidationException;
import com.github.fireshot.exceptions.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        MessageFormat.format("E-mail {0} not found in database.", email)
                ));
    }

    public UserDetails checkNicknameAvailability(String nickname) {
        return userRepository.findByNickname(nickname).orElse(null);
    }

    public User findByNickname(String nickname) {
        return userRepository.findByNickname(nickname).orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    public User findByEmailNullVariant(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    private void validateUser(RegisterRequestDTO user) {
        Pattern emailRegex = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        Pattern passwordRegex = Pattern.compile("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\-]).{8,}$");

        if (user.email() == null)
            throw new RegistrationValidationException("Please insert your e-mail.");
        if (user.password() == null)
            throw new RegistrationValidationException("Please insert your password.");

        Matcher emailMatcher = emailRegex.matcher(user.email());
        Matcher passwordMatcher = passwordRegex.matcher(user.password());

        if (!emailMatcher.matches())
            throw new RegistrationValidationException("Invalid e-mail");
        if (!passwordMatcher.matches())
            throw new RegistrationValidationException("Password is too weak.");
        if (!user.password().equals(user.confirmPassword()))
            throw new RegistrationValidationException("Passwords doesn't match.");
        if (user.nickname() == null || user.nickname().isEmpty())
            throw new RegistrationValidationException("Please insert your nickname.");
        if (isUserExistsByNickname(user.nickname()))
            throw new UserAlreadyExistsException("User with this nickname already exists.");
        if (isUserExistsByEmail(user.email()))
            throw new UserAlreadyExistsException("User with this e-mail already exists.");
    }

    public ResponseEntity<ResponseDTO<User>> getProfile(String loggedUser, String nickname) {
        User profileUser = findByNickname(nickname);
        User logged = userRepository.findByEmail(loggedUser).orElse(null);

        if (profileUser.getFollowers().contains(logged))
            profileUser.setFollowed(true);

        ResponseDTO<User> response = new ResponseDTO<>(200, "User found.", profileUser);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ResponseDTO<Object>> changeFollowProfile(String sourceUserEmail, String targetUserNickname, boolean isFollowing) {
        User sourceUser = findByEmail(sourceUserEmail);
        User targetUser = findByNickname(targetUserNickname);

        saveFollowToDatabase(sourceUser, targetUser, isFollowing);

        ResponseDTO<Object> response = new ResponseDTO<>(200, (isFollowing ? "Unfollowed " : "Followed ") + targetUserNickname);
        return ResponseEntity.ok(response);
    }

    private void saveFollowToDatabase(User sourceUser, User targetUser, boolean isFollowing) {
        Set<User> targetFollowers = targetUser.getFollowers();
        Set<User> sourceFollowing = sourceUser.getFollowing();

        if (isFollowing) {
            if (!targetFollowers.contains(sourceUser) || !sourceFollowing.contains(targetUser))
                throw new UserAlreadyExistsException(sourceUser.getNickname() + " is not following " + targetUser.getNickname());

            targetFollowers.remove(sourceUser);
            sourceFollowing.remove(targetUser);
        } else {
            if (targetFollowers.contains(sourceUser) || sourceFollowing.contains(targetUser))
                throw new UserAlreadyExistsException(sourceUser.getNickname() + " is already following " + targetUser.getNickname());

            targetFollowers.add(sourceUser);
            sourceFollowing.add(targetUser);
        }

        saveUser(sourceUser);
        saveUser(targetUser);
    }

    public ResponseEntity<ResponseSetDTO<String>> getProfileFollowers(String targetUserNickname) {
        Set<String> followers = findByNickname(targetUserNickname).getFollowers().stream().map(User::getNickname).collect(Collectors.toSet());

        ResponseSetDTO<String> response = new ResponseSetDTO<>(200, "Followers fetched.", followers);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ResponseSetDTO<String>> getProfileFollowing(String targetUserNickname) {
        Set<String> following = findByNickname(targetUserNickname).getFollowing().stream().map(User::getNickname).collect(Collectors.toSet());

        ResponseSetDTO<String> response = new ResponseSetDTO<>(200, "Following users fetched.", following);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ResponseSetDTO<String>> searchFromAllUsers(String searchInput) {
        ResponseSetDTO<String> response = new ResponseSetDTO<>(200, "All users fetched.", searchUserSet(userRepository.findAll(), searchInput));
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ResponseSetDTO<String>> searchFromUserFollowers(String targetUserNickname, String searchInput, boolean searchFollowers ) {
        User targetUser = findByNickname(targetUserNickname);
        Set<User> searchableUsers = searchFollowers ? targetUser.getFollowers() : targetUser.getFollowing();
        ResponseSetDTO<String> response = new ResponseSetDTO<>(200, "Users fetched.", searchUserSet(searchableUsers, searchInput));
        return ResponseEntity.ok(response);
    }

    public Set<String> searchUserSet(Collection<User> baseSet, String searchInput) {
        if(searchInput.equals("")) return new HashSet<>();

        return baseSet.stream().map(User::getNickname).filter(el -> el.contains(searchInput)).collect(Collectors.toSet());
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
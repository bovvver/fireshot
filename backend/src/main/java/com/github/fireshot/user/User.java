package com.github.fireshot.user;

import com.github.fireshot.enums.Role;
import com.github.fireshot.photo.Photo;
import jakarta.validation.constraints.Email;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

/**
 * User class containing structure of user passed to database.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails {
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue
    private int id;
    @Email
    private String email;
    private String nickname;
    private String password;
    private LocalDate passwordExpiration;
    private String description;
    @OneToMany(mappedBy = "owner", orphanRemoval = true)
    private List<Photo> photos;
    @ElementCollection
    @CollectionTable(name = "user_followers", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "follower_name")
    private List<User> followers;
    @ElementCollection
    @CollectionTable(name = "user_following", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "following_name")
    private List<User> following;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean expired;
    private boolean locked;
    private boolean enabled;
    @Transient
    private int passwordExp = 30;
//    TODO: private List<Notification> notifications;

    /**
     * Creates new User object.
     *
     * @param email    User's email address.
     * @param password User's password.
     * @param role     User's role in system.
     * @param expired  Has the user account expired.
     * @param locked   Has the user account been blocked.
     * @param enabled  Has the user account been closed.
     */
    public User(String email, String nickname, String password, Role role, boolean expired, boolean locked, boolean enabled) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.passwordExpiration = LocalDate.now().plusDays(passwordExp);
        this.description = "";
        this.photos = new ArrayList<>();
        this.followers = new LinkedList<>();
        this.following = new LinkedList<>();
        this.role = role;
        this.expired = expired;
        this.locked = locked;
        this.enabled = enabled;
    }

    /**
     * Returns roles attached to user. By default, it is only USER role.
     *
     * @return list of user roles.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Returns identifier by which the user is logged in.
     *
     * @return email of this User.
     */
    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return passwordExpiration.isAfter(LocalDate.now());
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

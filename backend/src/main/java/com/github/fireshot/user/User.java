package com.github.fireshot.user;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.github.fireshot.enums.Role;
import com.github.fireshot.photo.Photo;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * User class containing structure of user passed to database.
 */
@JsonIgnoreProperties(value = {"authorities", "username", "accountNonLocked", "credentialsNonExpired", "accountNonExpired"})
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    @JsonIgnore
    private int id;

    @Email
    private String email;

    private String nickname;

    @JsonIgnore
    private String password;

    @JsonIgnore
    private LocalDate passwordExpiration;

    private String description;

    @OneToMany(mappedBy = "owner", orphanRemoval = true)
    private List<Photo> photos;

    @ManyToMany
    @JoinTable(
            name = "followers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private Set<User> followers;

    @ManyToMany
    @JoinTable(
            name = "following",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id")
    )
    private Set<User> following;

    private boolean followed;

    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Role role;

    @JsonIgnore
    private boolean expired;

    @JsonIgnore
    private boolean locked;

    @JsonIgnore
    private boolean enabled;

    @Transient
    @JsonIgnore
    private int passwordExp = 30;

    // TODO: private List<Notification> notifications;

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
        this.followers = new LinkedHashSet<>();
        this.following = new LinkedHashSet<>();
        this.followed = false;
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

    @JsonGetter("photos")
    public List<String> getPhotoSources() {
        return photos.stream()
                .map(Photo::getSource)
                .collect(Collectors.toList());
    }

    @JsonGetter("followers")
    public int getFollowersLength() {
        return this.followers.size();
    }

    @JsonGetter("following")
    public int getFollowingLength() {
        return this.following.size();
    }
}

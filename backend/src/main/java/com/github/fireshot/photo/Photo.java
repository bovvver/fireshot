package com.github.fireshot.photo;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.github.fireshot.comment.Comment;
import com.github.fireshot.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Entity
@NoArgsConstructor
@Getter
public class Photo {
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue
    private int id;
    private String source;
    private String description;
    private String location;
    @OneToMany(mappedBy = "photo", orphanRemoval = true)
    private List<Comment> comments;
    @ManyToMany(mappedBy = "likedPhotos", cascade = CascadeType.ALL)
    private Set<User> likes;
    private Date date;
    @ManyToOne
    private User owner;
    private boolean liked;

    public Photo(String source, String description, String location, User owner) {
        this.source = source;
        this.description = description;
        this.location = location;
        this.comments = new LinkedList<>();
        this.likes = new HashSet<>();
        this.owner = owner;
        this.date = new Date();
        this.liked = false;
    }

    @JsonGetter("owner")
    public String getFollowersLength() {
        return this.owner.getNickname();
    }

    @JsonGetter("likes")
    public int getLikes() {
        return this.likes.size();
    }

    public Set<User> getLikesSet() {
        return this.likes;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }
}
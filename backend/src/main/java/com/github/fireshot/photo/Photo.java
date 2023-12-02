package com.github.fireshot.photo;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.github.fireshot.comment.Comment;
import com.github.fireshot.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

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
    private int likes;
    private Date date;
    @ManyToOne
    private User owner;

    public Photo(String source, String description, String location, User owner) {
        this.source = source;
        this.description = description;
        this.location = location;
        this.comments = new LinkedList<>();
        this.likes = 0;
        this.owner = owner;
        this.date = new Date();
    }

    @JsonGetter("owner")
    public String getFollowersLength() {
        return this.owner.getNickname();
    }
}

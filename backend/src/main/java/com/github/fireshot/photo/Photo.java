package com.github.fireshot.photo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.fireshot.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
public class Photo {
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue
    private int id;
    private String source;
    private String description;
    private String location;
    private List<String> comments;
    private int likes;
    @ManyToOne
    @JsonIgnore
    private User owner;

    public Photo(String source, String description, String location, List<String> comments, User owner) {
        this.source = source;
        this.description = source;
        this.location = source;
        this.comments = comments;
        this.likes = 0;
        this.owner = owner;
    }
}

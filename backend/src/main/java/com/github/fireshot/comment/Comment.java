package com.github.fireshot.comment;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.fireshot.photo.Photo;
import com.github.fireshot.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Comment {
    @Id
    @GeneratedValue
    @JsonIgnore
    private int id;
    @ManyToOne
    private User author;
    @JsonIgnore
    @ManyToOne
    private Photo photo;
    private String content;

    public Comment(User author, Photo photo, String content) {
        this.author = author;
        this.photo = photo;
        this.content = content;
    }

    @JsonGetter("author")
    public String getAuthor() {
        return this.author.getNickname();
    }
}

package com.github.fireshot.photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    @Query("SELECT p FROM Photo p " +
            "JOIN p.owner u " +
            "JOIN u.followers uf " +
            "WHERE uf.id = :userId " +
            "ORDER BY p.date DESC")
    Page<Photo> getPhotosForFollowedUsers(@Param("userId") int userId, Pageable pageable);

    Optional<Photo> findById(int id);
}

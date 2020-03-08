package com.github.thomaselliott.simplebattlemap.repository;

import com.github.thomaselliott.simplebattlemap.model.Session;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
}

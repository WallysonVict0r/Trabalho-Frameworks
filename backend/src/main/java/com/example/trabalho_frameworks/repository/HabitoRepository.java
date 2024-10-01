package com.example.trabalho_frameworks.repository;

import com.example.trabalho_frameworks.entities.HabitoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitoRepository extends JpaRepository<HabitoEntity, Long> { }